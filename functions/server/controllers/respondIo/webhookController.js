const { RESPOND_IO_BASE_API, RESPOND_IO_TOKEN } = require('../../../config/keys');
const NinoxMap = require('../../models/NinoxMap');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const getWhatsappTemplates = require('../../utils/getWhatsappTemplates');
const axios = require('axios').default;
const fs = require('fs');

const getFormattedDate = (timeStamp) => {
    let date = new Date(timeStamp); // Replace this with your desired date object

    let month = date.getMonth() + 1; // Months are zero-based, so we add 1
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? 'PM' : 'AM';

    // Format the date components with leading zeros if necessary
    let formattedMonth = month < 10 ? '0' + month : month;
    let formattedDay = day < 10 ? '0' + day : day;
    let formattedHours = hours % 12 || 12; // Convert to 12-hour format
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    let dateString =
        formattedMonth + '/' + formattedDay + '/' + year + ' ' + formattedHours + ':' + formattedMinutes + ' ' + period;
    return dateString;
};

const getContactData = (contactFields, ninoxData) => {
    const filledContactFields = {};
    Object.entries(contactFields).forEach((entry) => {
        const regex = /\$\((.*?)\)/g;
        let replacedData = '';
        if (entry[1]) {
            replacedData = entry[1].replace(regex, (match, placeholder) => {
                return ninoxData[placeholder] || '';
            });
        }

        filledContactFields[entry[0]] = replacedData;
    });

    return new Promise((resolve, reject) => {
        const contactData = {
            custom_fields: [],
        };
        axios
            .get(`${RESPOND_IO_BASE_API}/space/custom_field?limit=100`, {
                headers: { Authorization: `Bearer ${RESPOND_IO_TOKEN}` },
            })
            .then((res) => {
                Object.entries(filledContactFields).forEach((entry) => {
                    if (!entry[0].startsWith('custom')) {
                        contactData[entry[0]] = entry[1];
                    }
                });
                const customFields = res.data.items;
                customFields.forEach((entry) => {
                    contactData['custom_fields'].push({
                        name: entry.slug,
                        value: filledContactFields[`custom_${entry.name}`] || '',
                    });
                });
                resolve(contactData);
            })
            .catch((err) => {
                reject(err.response?.data.message || 'Error loading custom fields');
            });
    });
};

const sendMessage = (Phone, message, res) => {
    axios
        .post(
            `${RESPOND_IO_BASE_API}/contact/phone:${Phone}/message`,
            {
                channelId: 136424,
                recipient: {
                    phone_number: Phone,
                },
                message,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${RESPOND_IO_TOKEN}`,
                },
            }
        )
        .then((response) => {
            // fs.writeFile('message.json', JSON.stringify(message), () => {});
            return res.status(200).json({ status: 'success' });
        })
        .catch((err) => {
            return res.status(500).json({ error: err.response?.data.message || 'Error sending message' });
        });
};

module.exports = catchAsync(async (req, res, next) => {
    const ninoxData = req.body;
    // const ninoxData = {
    //     Table: 'PR FB',
    //     Table_id: 'E',
    //     Nome: 'Cceer',
    //     Cognome: 'Bhurtel',
    //     Email: 'sisir.sital@gmail.com',
    //     Phone: '+9779867524330',
    //     'Data e Ora': '06/15/2023 2:20 PM',
    //     Modulo: 'carlomagno',
    //     'Città di Partenza': 'Bologna Centrale (treno alta velocità)',
    //     Hotel: 'Hotel Terme Colella',
    //     'Tipi di Camera': 'doppia',
    //     'Periodo Soggiorno': '5 notti euro 485 per persona || trattamento mezza pensione',
    //     'Note Richieste': 'Dal 24 al 29 luglio 2023',
    //     'Totale Soggiorno': '290',
    //     'Preventivo Confermato': 'Yes',
    //     InfodaInserire: 'InfodaInserire',
    //     Id: 11163,
    // };
    ninoxData['Data e Ora'] = getFormattedDate(req.body['Data e Ora']);

    let { Table, Phone } = ninoxData;

    const templateMap = await NinoxMap.findOne({ tableName: Table });
    if (!templateMap) return res.status(400).json({ message: 'No template map for the table' });
    const templates = await getWhatsappTemplates();

    const selectedTemplate = templates.find((template) => template.name === templateMap.templateName);

    if (!selectedTemplate)
        return res.status(400).json({ message: `Template ${templateMap.templateName} not found in whatsapp.` });

    if (!Phone || Phone.length < 5) return res.status(400).json({ message: 'Wrong phone number' });

    if (!Phone.startsWith('+')) Phone = '+39' + Phone;

    const contactDetails = await getContactData(templateMap.contactMaps, ninoxData);
    let contact = null;

    //get a contact
    await axios
        .get(`${RESPOND_IO_BASE_API}/contact/phone:${Phone}`, {
            headers: { Authorization: `Bearer ${RESPOND_IO_TOKEN}` },
        })
        .then((response) => {
            contact = response.data;
        })
        .catch((err) => {
            if (err.response?.data.code === 404) {
                contact = undefined;
            }
        });

    try {
        if (contact) {
            // if contact already exists update the contact
            await axios.put(
                `${RESPOND_IO_BASE_API}/contact/phone:${Phone}`,
                {
                    ...contactDetails,
                },
                {
                    headers: { Authorization: `Bearer ${RESPOND_IO_TOKEN}` },
                }
            );
            // .then((res) => {
            //     console.log(res.data);
            // })
            // .catch((err) => {
            //     return next(new AppError(err.response?.data.message || 'Error creating contact', 400));
            // });
        } else {
            await axios.post(
                `${RESPOND_IO_BASE_API}/contact/phone:${Phone}`,
                { ...contactDetails },
                { headers: { Authorization: `Bearer ${RESPOND_IO_TOKEN}` } }
            );
            // .then((res) => {
            //     console.log(res.data);
            // })
            // .catch((err) => {

            // });
        }
    } catch (err) {
        return next(new AppError(err.response?.data.message || 'Error updating or creating contact', 400));
    }

    const getMeParameters = (rawText, parameters, button_type) => {
        const filledParameters = {};
        const parameterList = [];
        let text = rawText;
        Object.entries(parameters).forEach((entry) => {
            const regex = /\$\((.*?)\)/g;

            let replacedData = '';
            if (entry[1]) {
                replacedData = entry[1].replace(regex, (match, placeholder) => {
                    return ninoxData[placeholder] || '  ';
                });
            }

            filledParameters[entry[0]] = replacedData;
            // if (button_type) {
            //     parameterList.push({ type: button_type, [button_type]: replacedData });
            // } else {
            parameterList.push({ type: 'text', text: replacedData });
            // }
        });
        // const regexForCurlyBraces = /\{\{(\d+)\}\}/g;
        // const matches = rawText.match(regexForCurlyBraces);

        // matches.forEach((match) => {
        //     text = text.replace(match, filledParameters[`${type} ${match}`]);
        // });

        return parameterList;
    };

    const message = {
        type: 'whatsapp_template',
        template: {
            name: selectedTemplate.name,
            languageCode: selectedTemplate.language,
        },
    };

    let components = [];

    selectedTemplate.components.forEach((component) => {
        if (component.type === 'BUTTONS') {
            let buttonComponent = { type: 'buttons', buttons: [] };
            component.buttons.forEach((button, i) => {
                const buttonType = button.type.toLowerCase();
                let innerComponent = {
                    text: button.text,
                    type: buttonType,
                    [buttonType]: button[buttonType] || '',
                };

                const mapForComponent = templateMap.templateMaps.find((map) => map.type === `BUTTON_${button.type}`);
                if (mapForComponent) {
                    const result = getMeParameters(button[buttonType], mapForComponent.parameters, 'url');
                    innerComponent.parameters = result;
                }
                buttonComponent = { ...buttonComponent, buttons: buttonComponent.buttons.concat(innerComponent) };
            });
            components.push(buttonComponent);
        } else if (component.text) {
            const mapForComponent = templateMap.templateMaps.find((map) => map.type === component.type);
            let innerComponent = {
                type: component.type.toLowerCase(),
                text: component.text,
            };
            if (mapForComponent) {
                const result = getMeParameters(component.text, mapForComponent.parameters);
                innerComponent.parameters = result;
            }
            components.push(innerComponent);
        } else {
            components.push(component);
        }
        return;
    });
    message.template.components = components;

    sendMessage(Phone, message, res);

    // if contact doesnot exists create the contact

    // check template from database for the ninox Db

    // if exists
    // send the message to the contact
    //else
    // do nothing

    // https://api.respond.io/v2
    // /contact/{identifier}/message
    // {
    //     "type": "whatsapp_template",
    //     "template": {
    //       "name": "New Update",
    //       "languageCode": "en",
    //       "components": [
    //         {
    //           "parameters": []
    //         }
    //       ]
    //     }
    //   }
});
