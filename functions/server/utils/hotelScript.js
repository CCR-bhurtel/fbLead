const { default: axios } = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

const {
    NINOX_HOTEL_OFFERTE_TABLE_ID,
    NINOX_HOTEL_TABLE_ID,
    NINOX_API_KEY,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
    NINOX_BASE_API,
} = require('../../config/keys');
let baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;

class HotelScript {
    getHotelData = async () => {
        try {
            const response = await axios.get(`${baseNinoxTableURL}/${NINOX_HOTEL_TABLE_ID}/records`, {
                headers: {
                    Authorization: `Bearer ${NINOX_API_KEY}`,
                },
            });
            return response.data;
        } catch (err) {
            console.log('Error fetching hotel data');
        }
    };

    getXMLData = async () => {
        const hotels = await this.getHotelData();
        // fs.writeFile('xmlData.json', JSON.stringify(hotels), () => {});

        const xmlDataList = hotels.map(async (hotel) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.get(`${hotel.fields.XMLurl}`);
                    resolve({ id: hotel.id, ...hotel.fields, xmlString: response.data });
                    resolve('');
                } catch (err) {
                    console.log(err);
                }
            });
        });
        return xmlDataList;
    };

    deleteHotelOffertaRecords = async (recordIds) => {
        await axios.delete(`${baseNinoxTableURL}/${NINOX_HOTEL_OFFERTE_TABLE_ID}/records`, {
            headers: {
                Authorization: `Bearer ${NINOX_API_KEY}`,
                'Content-Type': 'application/json',
            },
            data: recordIds,
        });
    };

    lineBreakFormatChange = (text) => {
        return text.replace('<br/>', '\n');
    };
    createHotelOffertaRecords = (records) => {
        const dataToReturn = {
            lowestPrice: 0,
            offerteIds: [],
        };
        return new Promise((resolve, reject) => {
            var errorCount = 0;
            const lowestPrices = [];
            records.forEach(async (record) => {
                try {
                    const {
                        titolo_offerta,
                        id_offerta,
                        desc_offerta,
                        tipo_offerta,
                        data_dal,
                        data_al,
                        min_notti,
                        max_notti,
                        prezzo_fb,
                        prezzo_hb,
                        prezzo_bb,

                        bevande,
                        riduzioni,
                        supplementi,
                        pacchetto,
                        omaggi,
                        tagpremium,
                    } = record;
                    const dataToPost = {
                        fields: {
                            IDOFFERTA: id_offerta[0],
                            'Nome Offerta': this.lineBreakFormatChange(titolo_offerta[0]),

                            'Valida dal': new Date(data_dal[0]),
                            'Valida al': new Date(data_al[0]),
                            'minimo notti': parseInt(min_notti[0]),
                            'massimo notti': parseInt(max_notti[0]),
                            Bevande: bevande[0] === 0 ? 'non incluse' : 'incluse',
                            'Prezzo HB': parseInt(prezzo_hb[0]),
                            'Prezzo FB': parseInt(prezzo_fb[0]),
                            'Prezzo BB': parseInt(prezzo_bb[0]),
                            'Descrizione offerta': this.lineBreakFormatChange(desc_offerta[0]),
                            'Riduzioni offerta': this.lineBreakFormatChange(riduzioni[0]),
                            'Supplementi offerta': this.lineBreakFormatChange(supplementi[0]),
                            Pacchetto: this.lineBreakFormatChange(pacchetto[0]),
                            Omaggi: this.lineBreakFormatChange(omaggi[0]),
                            'Tag Offerta': this.lineBreakFormatChange(tagpremium[0]),
                            'Tipo offerta': tipo_offerta[0],
                            'Attiva / Non attiva': true,
                            // Priorità: 100,
                        },
                    };
                    const recordSavedResult = await axios.post(
                        `${baseNinoxTableURL}/${NINOX_HOTEL_OFFERTE_TABLE_ID}/records`,
                        {
                            ...dataToPost,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${NINOX_API_KEY}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    dataToReturn.offerteIds.push(recordSavedResult.data.id);

                    if (tipo_offerta === 'costo_giornaliero') {
                        lowestPrices.push(prezzo_bb || prezzo_hb || prezzo_fb);
                    } else if (tipo_offerta === 'totale_offerta') {
                        let prezzoLow = prezzo_bb || prezzo_hb || prezzo_fb;

                        lowestPrices.push(prezzoLow / min_notti);
                    }

                    if ((dataToReturn.offerteIds.length = records.length - errorCount)) {
                        let min = 0;

                        lowestPrices.forEach((price, i) => {
                            if (i === 0 || price < min) {
                                min = price;
                            }
                        });

                        dataToReturn.lowestPrice = min;

                        resolve(dataToReturn);
                    }
                } catch (err) {
                    errorCount++;
                    console.log('Error from record saving', err);
                }
            });
        });
    };

    // delete offerta, create offerta and udate hotel with new offerta ids
    crudOperationsOnHotelWithOfferta = (hotels) => {
        hotels.forEach(async (hotel) => {
            try {
                await this.deleteHotelOffertaRecords(hotel.Offerte);
                const dataReturnedAfterCreatingOfferta = await this.createHotelOffertaRecords(
                    hotel.extractedDetailsFromXML.offerte.offerta
                );
                await this.updateHotelRecordWithOfferteIds(
                    hotel.id,
                    dataReturnedAfterCreatingOfferta.offertaIds,
                    dataReturnedAfterCreatingOfferta.lowestPrice
                );
            } catch (err) {
                console.log(err);
            }
        });
    };

    updateHotelRecordWithOfferteIds = async (hotelId, offertaIds, lowestPrice) => {
        await axios.post(
            `${baseNinoxTableURL}/${NINOX_HOTEL_OFFERTE_TABLE_ID}/records`,
            {
                id: hotelId,
                fields: {
                    Offerte: offertaIds,
                    'Prezzo Minore': lowestPrice,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${NINOX_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    };

    runScript = async () => {
        this.getXMLData().then(async (response) => {
            const hotelsWithExtendedXMLData = await Promise.all(response);
            const hotelWithXMLConvertedToJSON = [];
            hotelsWithExtendedXMLData.forEach((hotel) => {
                xml2js.parseString(hotel.xmlString, (err, result) => {
                    hotelWithXMLConvertedToJSON.push({ ...hotel, xmlString: '', extractedDetailsFromXML: result });
                    // this.crudOperationsOnHotelWithOfferta(hotelWithXMLConvertedToJSON);
                });
            });

            // console.log(hotelWithXMLConvertedToJSON[0]);
            fs.writeFile('xmlData.json', JSON.stringify(hotelWithXMLConvertedToJSON), () => {});
        });
    };
}

const hotelScript = new HotelScript();
hotelScript.runScript();
