import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import Loading from '../Loading';
import TemplateInput from './TemplateInput';
import FormattedText from '../Layouts/FormattedText';
import UpdateContact from '../contactMaps/UpdateContactMap';
uuidv4();

function UpdateTemplate({ template, updateLocal, handleClose }) {
    const [loading, setLoading] = useState(false);

    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const [templates, setTemplates] = useState([]);
    const [tables, setTables] = useState([]);
    const [cMaps, setCMaps] = useState({ ...template.contactMaps });

    const [templateFieldMaps, setTemplateFieldmaps] = useState([...template.templateMaps]);

    const [updateCount, setUpdateCount] = useState(0);

    const [tUpdateCount, setTUpdateCount] = useState(0);

    const handleChangeContactFieldMap = (contactFieldMaps) => {
        setCMaps(contactFieldMaps);
    };

    const loadTemplates = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios
            .get('/api/respond/templates', { headers: { 'x-auth-token': token } })
            .then((res) => {
                setTemplates(res.data.templates);
                setTables(res.data.tables);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data.message || 'Error loading templates');
                setLoading(false);
                handleClose();
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let fulfill = true;
        console.log(templateFieldMaps);
        templateFieldMaps.forEach((map) => {
            Object.keys(map.parameters).forEach((key) => {
                if (!map.parameters[key]) {
                    fulfill = false;
                }
            });
        });
        const token = localStorage.getItem('token');
        if (!fulfill) {
            toast.error('Please add all fields');
            return;
        }
        axios
            .put(
                `/api/respond/templatemaps/${template._id}`,
                {
                    tableName: selectedTable.name,
                    templateName: selectedTemplate.name,
                    templateMaps: templateFieldMaps,
                    contactMaps: cMaps,
                },
                { headers: { 'x-auth-token': token } }
            )
            .then((res) => {
                toast.success('Template map updated successfully');

                updateLocal(res.data.templateMap);
                handleClose();
            })
            .catch((err) => {
                toast.error(err.response?.data.message || 'Error updating template map');
            });
    };

    useEffect(() => {
        if (tables) {
            const table_selected = tables.find((table) => table.name === template.tableName);
            setSelectedTable(table_selected);
        }
    }, [tables]);

    useEffect(() => {
        if (templates) {
            const template_selected = templates.find((templateInner) => templateInner.name === template.templateName);
            setSelectedTemplate(template_selected);
        }
    }, [templates]);

    const getMatchForField = (text, type, set) => {
        if (!text) return set;
        const matches = text.match(/{{(\d+)}}/g);
        if (matches) {
            const parameters = {};

            matches.forEach((match) => {
                parameters[`${type} ${match}`] = null;
            });
            if (!set) {
                setTemplateFieldmaps((prevState) => [{ display: text, parameters, type }]);
            } else {
                setTemplateFieldmaps((prevState) => prevState.concat({ display: text, parameters, type }));
            }

            return 1;
        }

        return set;
    };

    useEffect(() => {
        // {componentType}{{number}}
        // {{button}}{{url}}
        if (updateCount > 0) {
            setTemplateFieldmaps((prevMaps) => []);
            let set = 0;

            if (selectedTemplate) {
                selectedTemplate.components.forEach((component, i) => {
                    if (component['text']) {
                        set = getMatchForField(component['text'], component['type'], set);
                    } else if (component.type === 'BUTTONS') {
                        component.buttons.forEach((button) => {
                            set = getMatchForField(button[button.type.toLowerCase()], `BUTTON_${button.type}`, set);
                        });
                    }
                });
            }
        }
    }, [selectedTemplate, selectedTable]);

    useEffect(() => {
        loadTemplates();
    }, []);

    return (
        <div className="bg-white absolute min-w-[30rem] min-h-[10rem] max-h-[30rem] overflow-y-scroll rounded-xl p-4 ">
            <Toaster />
            <h1 className="font-semibold text-xl text-center">Update template map</h1>
            <form onSubmit={handleSubmit} className="w-100 flex flex-col items-center justify-center">
                {loading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        <select
                            type="text"
                            name="formId"
                            placeholder="Select"
                            required={true}
                            onChange={(e) => {
                                setUpdateCount(1);
                                setTUpdateCount(1);

                                const table = tables.find((table) => table.name === e.target.value);
                                setSelectedTable(table);
                            }}
                            value={selectedTable?.name}
                            className="outline-0 border-[0.5px] mt-4 border-gray-400 rounded-md focus:border rounde-md focus:border-blue-300 w-[90%] p-[10px]"
                        >
                            <option disabled selected hidden>
                                Select table from ninox
                            </option>
                            {tables.map((table) => (
                                <option key={table.id} value={table.name}>
                                    {table.name}
                                </option>
                            ))}
                        </select>
                        <select
                            type="text"
                            name="formName"
                            placeholder="Form name"
                            required={true}
                            onChange={(e) => {
                                setUpdateCount(1);
                                const template = templates.find((template) => template.name === e.target.value);
                                setSelectedTemplate(template);
                            }}
                            value={selectedTemplate?.name}
                            className="outline-0 border-[0.5px] mt-4 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[90%] p-[10px]"
                        >
                            <option disabled selected hidden>
                                Select whatsapp template
                            </option>
                            {templates.map((template) => (
                                <option key={template.name} value={template.name}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {templateFieldMaps.length && selectedTable && selectedTemplate ? (
                    <div className="mt-4 flex flex-col items-center justify-center ">
                        {templateFieldMaps.map((component) => (
                            <div className="mt-4 flex flex-col items-center">
                                <FormattedText text={component.display} />
                                {Object.keys(component.parameters).map((key) => {
                                    const uniqueKeyName = key;
                                    return (
                                        <TemplateInput
                                            key={uniqueKeyName}
                                            initialValue={component.parameters[key]}
                                            keyName={key}
                                            handleInputChange={(content) => {
                                                const newMaps = templateFieldMaps.map((innerComponent) => {
                                                    if (innerComponent.type === component.type) {
                                                        return {
                                                            ...innerComponent,
                                                            parameters: {
                                                                ...innerComponent.parameters,
                                                                [key]: content,
                                                            },
                                                        };
                                                    } else {
                                                        return innerComponent;
                                                    }
                                                });
                                                setTemplateFieldmaps(newMaps);
                                            }}
                                            selectedTable={selectedTable}
                                            selectedTemplate={selectedTemplate}
                                            updateCount={updateCount}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                        <UpdateContact
                            tableUpdateCount={tUpdateCount}
                            selectedTable={selectedTable}
                            handleChangeContactFieldMap={handleChangeContactFieldMap}
                            initialState={template.contactMaps}
                        />
                    </div>
                ) : (
                    <></>
                )}

                <button className="bg-blue-600 mt-4 text-white w-[5rem] p-3 rounded-md hover:bg-transparent hover:border-[1px] hover:border-blue-600 hover:text-blue-600">
                    update
                </button>
            </form>
        </div>
    );
}

export default UpdateTemplate;
