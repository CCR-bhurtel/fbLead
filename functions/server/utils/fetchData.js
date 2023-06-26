const axios = require('axios');
const PriceMedium = require('../models/Price');

const API_KEY = '2fde8030-edc3-11ed-89d7-377b54b7b039';
const teamId = 'nHhB2Tff7X8xu5FTk';
const databaseId = 'tvwj36nkrvym';
const tableId = 'J';

async function fetchData() {
    try {
        let allRecords = [];
        let pageSize = 100;
        let page = 1;
        let hasMoreRecords = true;
        let averageValues = [];
        while (hasMoreRecords) {
            const url = `https://api.ninoxdb.de/v1/teams/${teamId}/databases/${databaseId}/tables/${tableId}/records?limit=${pageSize}&page=${page}`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;
                // const records = data.records;

                allRecords.push(...data);

                // Check if there are more records to fetch
                hasMoreRecords = data.length === pageSize;
                page++;
            } catch (error) {
                console.error('Error fetching records:', error);
                break;
            }
        }

        // Find the record with the oldest "Valida dal" date
        const oldestRecord = allRecords.reduce((oldest, record) => {
            const currentDate = new Date(record.fields['Valida dal']);
            const oldestDate = new Date(oldest.fields['Valida dal']);
            return currentDate < oldestDate ? record : oldest;
        });

        // Find the record with the latest "Valida al" date
        const latestRecord = allRecords.reduce((latest, record) => {
            const currentDate = new Date(record.fields['Valida al']);
            const latestDate = new Date(latest.fields['Valida al']);
            return currentDate > latestDate ? record : latest;
        });

        // Set the start date as the "Valida dal" date of the oldest record
        const startDate = new Date(oldestRecord.fields['Valida dal']);

        // Set the end date as the "Valida al" date of the latest record
        console.log(latestRecord, allRecords.length);
        const endDate = new Date(latestRecord.fields['Valida al']);

        // Calculate average values for each date in between
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const filteredRecords = allRecords.filter((record) => {
                const validFromDate = new Date(record.fields['Valida dal']);
                const validToDate = new Date(record.fields['Valida al']);
                return currentDate >= validFromDate && currentDate <= validToDate;
            });

            const prices = filteredRecords.map((record) => {
                // Check if Tipo offerta contains "Totale offerta"
                const tipoOfferta = record.fields['Tipo offerta'];
                const isTotaleOfferta = tipoOfferta && tipoOfferta.includes('Totale offerta');

                // Get the price field (Prezzo HB or Prezzo FB)
                const priceHB = record.fields['Prezzo HB'];
                const priceFB = record.fields['Prezzo FB'];
                const price = priceHB !== undefined ? priceHB : priceFB;

                // Divide the price by the number of minimum nights if "Tipo offerta" is "Totale offerta"
                return isTotaleOfferta ? price / record.fields['minimo notti'] : price;
            });

            const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
            const formattedDate = currentDate.toLocaleDateString('en-US');
            if (isNaN(averagePrice)) {
                averageValues.push(`${formattedDate}: ${0}`);
            } else {
                averageValues.push(`${formattedDate}: ${averagePrice}`);
            }
            // Move to the next date
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Update averageValues to database
        const priceValues = await PriceMedium.findByIdAndUpdate(
            '64971284f2269b06b2297a3f',
            {
                $push: { data: { $each: averageValues } },
            },
            { new: true }
        );
        return priceValues.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchData;
