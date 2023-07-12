const { default: axios } = require('axios');
const {
    NINOX_BASE_API,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
    NINOX_HOTEL_OFFERTE_TABLE_ID,
    NINOX_HOTEL_TABLE_ID,
    NINOX_API_KEY,
} = require('../../../config/keys');
const catchAsync = require('../../utils/catchAsync');

let baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;

const formatDate = (dateString) => {
    var parts = dateString.split('/'); // Split the string by '/'
    var formattedDate = parts[2] + '-' + ('0' + parts[0]).slice(-2) + '-' + ('0' + parts[1]).slice(-2);

    return new Date(formattedDate);
};

exports.initialData = catchAsync(async (req, res, next) => {
    console.log(`${baseNinoxTableURL}/${NINOX_HOTEL_TABLE_ID}/records`);

    const comunes = [];
    const uniqueCommunes = [];
    const uniqueStelles = [];
    const stelles = [];
    const distances = [
        {
            name: '1 km - 5 km',
            value: 0,
        },
        {
            name: '5 km - 10 km',
            value: 1,
        },
        {
            name: '1 km - 15 km',
            value: 2,
        },
        {
            name: '50km+ ',
            value: 3,
        },
    ];

    const fascio = [
        {
            name: '10€ - 100€',
            value: 0,
        },
        {
            name: '200€ - 500€',
            value: 1,
        },
        {
            name: '500€ - 1000€',
            value: 2,
        },
        {
            name: '1000€ - 3000€',
            value: 3,
        },
    ];

    const dateAfterTwoDays = new Date();
    dateAfterTwoDays.setDate(dateAfterTwoDays.getDate() + 2);

    const dateAfterAWeek = new Date();
    dateAfterAWeek.setDate(dateAfterAWeek.getDate() + 7);

    const hotelRecordsResponse = await axios.get(`${baseNinoxTableURL}/${NINOX_HOTEL_TABLE_ID}/records`, {
        headers: {
            Authorization: `Bearer ${NINOX_API_KEY}`,
        },
    });
    hotelRecordsResponse.data.forEach((hotel) => {
        const comune = hotel.fields['Comune'].trim();

        const stelle = hotel.fields['Stelle struttura'];

        if (comune && !uniqueCommunes.includes(comune)) {
            comunes.push({ name: comune });
            uniqueCommunes.push(comune.trim());
        }
        if (stelle && !uniqueStelles.includes(stelle)) {
            stelles.push({ name: stelle });
            uniqueStelles.push(stelle);
        }
    });
    const sortedStelles = stelles.sort((a, b) => parseInt(a.name[0]) - parseInt(b.name[0]));
    return res
        .status(200)
        .json({ comunes, stelles: sortedStelles, distances, fascio, dateAfterTwoDays, dateAfterAWeek });
});

const filterCommune = (comune, records) => {
    return records.filter((record) => record['Comune'] === comune);
};
const filterFascio = (fascio, records) => {
    switch (fascio.value) {
        case 0:
            return records.filter((record) => record['Prezzo Minore'] >= 10 && record['Prezzo Minore'] <= 100);
        case 1:
            return records.filter((record) => record['Prezzo Minore'] >= 200 && record['Prezzo Minore'] <= 500);
        case 2:
            return records.filter((record) => record['Prezzo Minore'] >= 500 && record['Prezzo Minore'] <= 1000);

        case 3:
            return records.filter((record) => record['Prezzo Minore'] >= 1000 && record['Prezzo Minore'] <= 3000);

        default:
            return records;
    }
};

const filterDistance = (distance, records) => {
    switch (distance.value) {
        case 0:
            return records.filter(
                (record) => record['Distanza centro'].split(' ')[0] >= 1 && record['Distanza centro'].split(' ')[0] <= 5
            );
        case 1:
            return records.filter(
                (record) =>
                    record['Distanza centro'].split(' ')[0] >= 5 && record['Distanza centro'].split(' ')[0] <= 15
            );
        case 2:
            return records.filter(
                (record) =>
                    record['Distanza centro'].split(' ')[0] >= 1 && record['Distanza centro'].split(' ')[0] <= 15
            );

        case 3:
            return records.filter((record) => parseInt(record['Distanza centro'].split(' ')[0]) >= 50);

        default:
            return records;
    }
};

const filterStelle = (stelle, records) => {
    return records.filter((record) => record['Stelle struttura'] === stelle);
};

const sortRecordsOnPriorita = (records) => {
    return records.sort((a, b) => {
        let prioritaA = a['Priorità'];
        let prioritaB = b['Priorità'];
        if (!prioritaA) return 1;
        if (!prioritaB) return -1;
        return prioritaA - prioritaB;
    });
};

exports.getHotelData = catchAsync(async (req, res, next) => {
    const { checkInDate, checkOutDate, comune, distance, fascio, stelle } = req.body;

    //  fetch data from offerte hotel with the required checkInDate and checkOutDate

    // "Valida dal": "2023-08-11",
    // "Valida al": "2023-08-13",

    const offerteRecordsResponse = await axios.get(
        `${baseNinoxTableURL}/${NINOX_HOTEL_OFFERTE_TABLE_ID}/records?perPage=1000`,
        {
            headers: {
                Authorization: `Bearer ${NINOX_API_KEY}`,
            },
        }
    );

    const linkedHotels = [];
    const filteredUniqueHotels = [];

    const offerteRecords = offerteRecordsResponse.data;

    offerteRecords.forEach((record, i) => {
        const checkInDateFromRecord = new Date(record.fields['Valida dal']);
        const checkOutDateFromRecord = new Date(record.fields['Valida al']);

        const checkInDateFromQuery = new Date(checkInDate);
        const checkOutDateFromQuery = new Date(checkOutDate);

        const condition1 =
            checkInDateFromRecord <= checkInDateFromQuery && checkOutDateFromRecord >= checkOutDateFromQuery;
        const condition2 =
            checkInDateFromRecord >= checkInDateFromQuery && checkInDateFromRecord <= checkOutDateFromQuery;
        const condition3 =
            checkOutDateFromRecord <= checkOutDateFromQuery && checkOutDateFromRecord >= checkInDateFromQuery;

        if (condition1 || condition2 || condition3) {
            linkedHotels.push(record.fields.Hotel);
        }

        if (i === offerteRecords.length - 1) {
            linkedHotels.forEach((hotel) => {
                if (!filteredUniqueHotels.includes(hotel)) {
                    filteredUniqueHotels.push(hotel);
                }
            });
        }
    });

    const hotelRecordsResponse = await axios.get(`${baseNinoxTableURL}/${NINOX_HOTEL_TABLE_ID}/records?perPage=500`, {
        headers: {
            Authorization: `Bearer ${NINOX_API_KEY}`,
        },
    });

    let hotelRecords = [];
    hotelRecordsResponse.data.forEach((hotel) => {
        if (filteredUniqueHotels.includes(hotel.id)) {
            hotelRecords.push({ id: hotel.id, ...hotel.fields });
        }
    });

    // const dataAfterFilteringComune = filterCommune(comune.name, hotelRecords);

    // console.log(dataAfterFilteringComune);
    // console.log(distance);
    // const dataAfterFilteringDistance = filterDistance(distance, dataAfterFilteringComune);
    // console.log(dataAfterFilteringDistance);

    // const dataAfterFilteringFascio = filterFascio(fascio, dataAfterFilteringDistance);

    // hotelRecords = filterStelle(stelle.name, dataAfterFilteringFascio);

    // Distanza mare, Priorità, Prezzo Minore && lastly Priorità
    const sortedHotelsOnDistanzaMare = hotelRecords.sort((a, b) => {
        let distanceA = a['Distanza mare'];
        let distanceB = b['Distanza mare'];

        if (!distanceA) return 1;
        if (!distanceB) return -1;

        distanceA = parseInt(distanceA.split(' ')[0]);
        distanceB = parseInt(distanceB.split(' ')[0]);
        return distanceA - distanceB;
    });

    if (!sortedHotelsOnDistanzaMare.length) return res.status(200).json({ hotels: [] });

    let hotelWithLowestDistanzaMare = { ...sortedHotelsOnDistanzaMare[0], ticker: 'Più vicino al mare' };

    const sortedHotelsOnPriorita = sortRecordsOnPriorita(sortedHotelsOnDistanzaMare.slice(1));

    if (!sortedHotelsOnPriorita.length) return res.status(200).json({ hotels: [hotelWithLowestDistanzaMare] });

    let hotelWithLowestPriorita = { ...sortedHotelsOnPriorita[0], ticker: 'Più Venduto' };

    const sortedHotelsOnPrezzo = sortedHotelsOnPriorita.slice(1).sort((a, b) => {
        let prezzoA = a['Prezzo Minore'];
        let prezzoB = b['Prezzo Minore'];
        if (!prezzoA) return 1;
        if (!prezzoB) return -1;

        return prezzoA - prezzoB;
    });

    if (!sortedHotelsOnPrezzo.length)
        return res.status(200).json({ hotels: [hotelWithLowestDistanzaMare, hotelWithLowestPriorita] });
    let hotelWithLowestPrezzo = { ...sortedHotelsOnPrezzo[0], ticker: 'Prezzo più basso' };

    let remainingRecords = sortRecordsOnPriorita(sortedHotelsOnPrezzo.slice(1));

    return res.status(200).json({
        hotels: [hotelWithLowestDistanzaMare, hotelWithLowestPriorita, hotelWithLowestPrezzo, ...remainingRecords],
    });
    //  filter hotels with given other filters

    // send hotel
});
