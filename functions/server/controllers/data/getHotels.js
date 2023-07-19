const { default: axios } = require('axios');
const seedrandom = require('seedrandom');
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

function generateRandomNumber(id) {
    var rng = seedrandom(id.toString()); // Seed the random number generator with the ID
    return Math.floor((rng() * 120000 + 5000) / 1000) + 'K'; // Generate a random number within the specified range
}

function calculateDaysAndNights(startDate, endDate) {
    // Convert the dates to milliseconds
    const startMillis = new Date(startDate).getTime();
    const endMillis = new Date(endDate).getTime();

    // Calculate the time difference in milliseconds
    const timeDiffMillis = endMillis - startMillis;

    var numberOfNights = Math.floor(timeDiffMillis / (1000 * 3600 * 24));

    // Calculate the number of days
    const days = Math.ceil(timeDiffMillis / (1000 * 60 * 60 * 24));

    return { days, nights: numberOfNights };
}
exports.initialData = catchAsync(async (req, res, next) => {
    const comunes = [{ name: "Tutta l'isola" }];
    const uniqueCommunes = [];
    const uniqueStelles = [];
    const stelles = [{ name: 'Tutti' }];
    const distances = [
        { name: 'Tutti', value: 0 },
        {
            name: '0 mt - 500 mt',
            value: 1,
        },
        {
            name: '500 mt - 1 km',
            value: 2,
        },
        {
            name: '1 km+',
            value: 3,
        },
    ];

    const fascio = [
        {
            name: 'Tutti',
            value: 0,
        },
        {
            name: 'fino a 40€',
            value: 1,
        },
        {
            name: 'tra 40€ e 80€',
            value: 2,
        },
        {
            name: 'più di 80€',
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
            return records;
        case 1:
            return records.filter((record) => record['Prezzo Minore'] < 40);
        case 2:
            return records.filter((record) => record['Prezzo Minore'] >= 40 && record['Prezzo Minore'] <= 80);

        case 3:
            return records.filter((record) => record['Prezzo Minore'] > 80);

        default:
            return records;
    }
};

const getDistance = (record) => {
    let distance = record['Distanza mare'];

    if (!distance || !distance.length) return null;

    const distanceSplitted = distance.split(' ');

    let distanceValue = parseFloat(distanceSplitted[0].replace(',', '.'));

    let distanceUnit = distanceSplitted[1].trim();

    if (isNaN(distanceValue)) return 0;

    if (distanceUnit !== 'mt' && distanceUnit !== 'mt.') {
        distanceValue = distanceValue * 1000;
    }

    return distanceValue;
};

const filterDistance = (distance, records) => {
    switch (distance.value) {
        case 0:
            return records;

        case 1:
            return records.filter((record) => {
                const distance = getDistance(record);
                return distance >= 0 && distance < 500;
            });
        case 2:
            return records.filter((record) => {
                const distance = getDistance(record);

                return distance >= 500 && distance <= 1000;
            });

        case 3:
            return records.filter((record) => {
                const distance = getDistance(record);

                return distance > 1000;
            });

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

const getFilters = (
    hotelRecords,
    lastChange,
    currentComunes,
    currentDistances,
    currentFascio,
    currentStelles,
    stelle,
    comune,
    fascio,
    distance,
    filterFor
) => {
    const comunes = ["Tutta l'isola"];

    const stelles = ['Tutti'];

    const fascias = ['Tutti'];

    const distances = ['Tutti'];

    let fasciasWithName = [{ name: 'Tutti', value: 0 }];
    let distancesWithName = [{ name: 'Tutti', value: 0 }];

    if (comune.name !== "Tutta l'isola" && filterFor !== 'comune')
        hotelRecords = filterCommune(comune.name, hotelRecords);

    if (distance.value !== 0 && filterFor !== 'distance') hotelRecords = filterDistance(distance, hotelRecords);

    if (stelle.name !== 'Tutti' && filterFor !== 'stelle') hotelRecords = filterStelle(stelle.name, hotelRecords);

    if (fascio.value !== 0 && filterFor !== 'fascio') hotelRecords = filterFascio(fascio, hotelRecords);
    hotelRecords.forEach((hotel) => {
        const comuneFromHotel = hotel.Comune.trim();
        const stelleFromHotel = hotel['Stelle struttura'];
        const fasciaFromHotel = hotel['Prezzo Minore'];
        const distance_hotel = getDistance(hotel);

        let condition = false;

        /*
        if(lastChanged==="comune") condition = comuneFromHotel===comune.name
         */

        switch (lastChange) {
            case 'comune':
                if (comune.name === "Tutta l'isola") condition = true;
                else condition = comuneFromHotel === comune.name;
                break;

            case 'stelle':
                if (stelle.name === 'Tutti') condition = true;
                else condition = stelleFromHotel === stelle.name;
                break;

            case 'distance':
                if (distance.value === 0) condition = true;
                else if (distance.value === 1) {
                    condition = distance_hotel >= 0 && distance_hotel < 500;
                } else if (distance.value === 2) {
                    condition = distance_hotel >= 500 && distance_hotel <= 1000;
                } else if (distance.value === 3) {
                    condition = distance_hotel > 1000;
                }

                break;

            case 'fascio':
                if (fascio.value === 0) condition = true;
                else if (fascio.value === 1) condition = fasciaFromHotel < 40;
                else if (fascio.value === 2) condition = fasciaFromHotel >= 40 && fasciaFromHotel <= 80;
                else if (fascio.value === 3) condition = fasciaFromHotel > 80;
                break;

            default:
                condition = true;
                break;
        }
        // {
        //     name: 'fino a 40€',
        //     value: 1,
        // },
        // {
        //     name: 'tra 40€ e 80€',
        //     value: 2,
        // },
        // {
        //     name: 'più di 80€',
        //     value: 3,
        // },

        let conditionStelle = lastChange === 'stelle' || condition;
        let conditionComune = lastChange === 'comune' || condition;
        let conditionFascia = lastChange === 'fascio' || condition;
        let conditionDistance = lastChange === 'distance' || condition;

        if (!stelles.includes(stelleFromHotel) && conditionStelle) stelles.push(stelleFromHotel);

        if (!comunes.includes(comuneFromHotel) && conditionComune) comunes.push(comuneFromHotel);

        if (conditionFascia) {
            if (fasciaFromHotel < 40 && !fascias.includes('fino a 40€')) {
                fascias.push('fino a 40€');
                fasciasWithName.push({ name: 'fino a 40€', value: 1 });
            }
            if (fasciaFromHotel >= 40 && fasciaFromHotel <= 80 && !fascias.includes('tra 40€ e 80€')) {
                fascias.push('tra 40€ e 80€');
                fasciasWithName.push({ name: 'tra 40€ e 80€', value: 2 });
            }
            if (fasciaFromHotel > 80 && !fascias.includes('più di 80€')) {
                fascias.push('più di 80€');
                fasciasWithName.push({ name: 'più di 80€', value: 3 });
            }
        }

        // {
        //     name: '0 mt - 500 mt',
        //     value: 1,
        // },
        // {
        //     name: '500 mt - 1 km',
        //     value: 2,
        // },
        // {
        //     name: '1 km+',
        //     value: 3,
        // },
        if (conditionDistance) {
            if (distance_hotel >= 0 && distance_hotel < 500 && !distances.includes('0 mt - 500 mt')) {
                distances.push('0 mt - 500 mt');
                distancesWithName.push({ name: '0 mt - 500 mt', value: 1 });
            } else if (distance_hotel >= 500 && distance_hotel < 1000 && !distances.includes('500 mt - 1 km')) {
                distances.push('500 mt - 1 km');
                distancesWithName.push({ name: '500 mt - 1 km', value: 2 });
            } else if (distance_hotel > 1000 && !distances.includes('1 km+')) {
                distances.push('1 km+');
                distancesWithName.push({ name: '1 km+', value: 3 });
            }
        }
    });

    let comunesWithName = comunes.map((comune) => ({ name: comune }));
    let stellesWithName = stelles.map((stelle) => ({ name: stelle }));

    comunesWithName = comunesWithName.sort((a, b) => (a.name === comune.name ? -1 : 1));
    fasciasWithName = fasciasWithName.sort((a, b) => {
        if (a.name === fascio.name) return -1;
        if (b.name === fascio.name) return 1;
        return a.value - b.value;
    });
    stellesWithName = [
        { name: 'Tutti' },
        ...stellesWithName.slice(1).sort((a, b) => {
            let stellevalueA = parseInt(a.name.split(' '));
            let stellevalueB = parseInt(b.name.split(' '));
            return stellevalueA - stellevalueB;
        }),
    ];

    distancesWithName = distancesWithName.sort((a, b) => {
        if (a.name === distance.name) return -1;
        if (b.name === distance.name) return 1;
        return a.value - b.value;
    });

    const filters = {
        comunes:
            lastChange === 'comune'
                ? comune.name === "Tutta l'isola"
                    ? comunesWithName
                    : currentComunes
                : comunesWithName,
        stelles:
            lastChange === 'stelle' ? (stelle.name === 'Tutti' ? stellesWithName : currentStelles) : stellesWithName,
        fascias: lastChange === 'fascio' ? (fascio.value === 0 ? fasciasWithName : currentFascio) : fasciasWithName,
        distances:
            lastChange === 'distance'
                ? distance.value === 0
                    ? distancesWithName
                    : currentDistances
                : distancesWithName,
    };
    return filters;
};

exports.getHotelData = catchAsync(async (req, res, next) => {
    let {
        checkInDate,
        checkOutDate,
        comune,
        distance,
        fascio,
        stelle,
        lastChange,
        currentComunes,
        currentDistances,
        currentStelles,
        currentFascio,
    } = req.body;

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

        const minNights = parseInt(record.fields['minimo notti']);
        const maxNights = parseInt(record.fields['massimo notti']);

        const { nights } = calculateDaysAndNights(checkInDateFromQuery, checkOutDateFromQuery);

        const threeDaysBeforeCheckInDateFromQuery = new Date(checkInDateFromQuery).setDate(
            checkInDateFromQuery.getDate() - 3
        );
        const threeDaysAfterCheckInDateFromQuery = new Date(checkInDateFromQuery).setDate(
            checkInDateFromQuery.getDate() + 3
        );

        const threeDaysBeforeCheckOutDateFromQuery = new Date(checkOutDate).setDate(
            checkOutDateFromQuery.getDate() - 3
        );

        const threeDaysAfterCheckOutDateFromQuery = new Date(checkOutDate).setDate(checkOutDateFromQuery.getDate() + 3);

        const condition1 =
            checkInDateFromRecord <= threeDaysAfterCheckInDateFromQuery &&
            checkOutDateFromRecord >= threeDaysAfterCheckInDateFromQuery;
        const condition2 =
            checkInDateFromRecord <= threeDaysBeforeCheckInDateFromQuery &&
            checkOutDateFromRecord >= threeDaysBeforeCheckInDateFromQuery;
        const condition3 =
            checkInDateFromRecord <= threeDaysBeforeCheckOutDateFromQuery &&
            checkOutDateFromRecord >= threeDaysBeforeCheckOutDateFromQuery;

        const condition4 =
            checkInDateFromRecord <= threeDaysAfterCheckOutDateFromQuery &&
            checkOutDateFromRecord >= threeDaysAfterCheckOutDateFromQuery;

        if (condition1 || condition2 || condition3 || condition4) {
            if (nights > 7) {
                if (minNights === 7 || maxNights === 7) {
                    linkedHotels.push(record.fields.Hotel);
                }
            } else {
                if (nights - 1 === minNights || minNights === nights || nights + 1 === minNights) {
                    linkedHotels.push(record.fields.Hotel);
                } else if (nights - 1 === minNights || nights === maxNights || nights + 1 === maxNights) {
                    linkedHotels.push(record.fields.Hotel);
                }
            }
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
            hotelRecords.push({ id: hotel.id, ...hotel.fields, reviews: generateRandomNumber(hotel.id) });
        }
    });

    if (!hotelRecords.length) {
        return res.status(200).json({
            hotels: [],
            filters: {
                comunes: [{ name: "Tutta l'isola" }],
                stelles: [{ name: 'Tutti' }],
                fascias: [{ name: 'Tutti' }],
                distances: [{ name: 'Tutti' }],
            },
        });
    }

    const filterForCommunes = getFilters(
        hotelRecords,
        lastChange,
        currentComunes,
        currentDistances,
        currentFascio,
        currentStelles,
        stelle,
        comune,
        fascio,
        distance,
        'comune'
    );

    const filterForStelles = getFilters(
        hotelRecords,
        lastChange,
        currentComunes,
        currentDistances,
        currentFascio,
        currentStelles,
        stelle,
        comune,
        fascio,
        distance,
        'stelle'
    );

    const filterForDistances = getFilters(
        hotelRecords,
        lastChange,
        currentComunes,
        currentDistances,
        currentFascio,
        currentStelles,
        stelle,
        comune,
        fascio,
        distance,
        'distance'
    );

    const filterForFascio = getFilters(
        hotelRecords,
        lastChange,
        currentComunes,
        currentDistances,
        currentFascio,
        currentStelles,
        stelle,
        comune,
        fascio,
        distance,
        'fascio'
    );

    const filters = {
        comunes:
            lastChange === 'comune'
                ? comune.name === "Tutta l'isola"
                    ? filterForCommunes.comunes
                    : currentComunes
                : filterForCommunes.comunes,
        stelles:
            lastChange === 'stelle'
                ? stelle.name === 'Tutti'
                    ? filterForStelles.stelles
                    : currentStelles
                : filterForStelles.stelles,
        fascias:
            lastChange === 'fascio'
                ? fascio.value === 0
                    ? filterForFascio.fascias
                    : currentFascio
                : filterForFascio.fascias,
        distances:
            lastChange === 'distance'
                ? distance.value === 0
                    ? filterForDistances.distances
                    : currentDistances
                : filterForDistances.distances,
    };

    if (comune.name !== "Tutta l'isola") hotelRecords = filterCommune(comune.name, hotelRecords);

    if (distance.value !== 0) hotelRecords = filterDistance(distance, hotelRecords);

    if (stelle.name !== 'Tutti') hotelRecords = filterStelle(stelle.name, hotelRecords);

    if (fascio.value !== 0) hotelRecords = filterFascio(fascio, hotelRecords);

    // Distanza mare, Priorità, Prezzo Minore && lastly Priorità
    const sortedHotelsOnDistanzaMare = hotelRecords.sort((a, b) => {
        let distanceA = a['Distanza mare'];
        let distanceB = b['Distanza mare'];
        let distanceValueA;
        let distanceValueB;

        if (!distanceA) distanceValueA = 0;
        if (!distanceB) distanceValueB = 0;

        const distanceASplitted = distanceA.split(' ');
        const distanceBSplitted = distanceB.split(' ');

        distanceValueA = parseFloat(distanceASplitted[0]);
        distanceValueB = parseFloat(distanceBSplitted[0]);

        let distanceUnitA = distanceASplitted[1];
        let distanceUnitB = distanceBSplitted[1];

        if (isNaN(distanceValueA)) distanceValueA = 0;
        if (isNaN(distanceValueB)) distanceValueB = 0;

        if (distanceUnitA !== 'mt' && distanceUnitA !== 'mt.') distanceValueA = distanceValueA * 1000;
        if (distanceUnitB !== 'mt' && distanceUnitB !== 'mt.') distanceValueB = distanceValueB * 1000;
        return distanceValueA - distanceValueB;
    });

    // final filter changes here

    const comunes = ["Tutta l'isola"];

    const stelles = ['Tutti'];

    const fascias = ['Tutti'];

    const distances = ['Tutti'];

    let fasciasWithName = [{ name: 'Tutti', value: 0 }];
    let distancesWithName = [{ name: 'Tutti', value: 0 }];

    if (comune.name !== "Tutta l'isola") hotelRecords = filterCommune(comune.name, hotelRecords);

    if (distance.value !== 0) hotelRecords = filterDistance(distance, hotelRecords);

    if (stelle.name !== 'Tutti') hotelRecords = filterStelle(stelle.name, hotelRecords);

    if (fascio.value !== 0) hotelRecords = filterFascio(fascio, hotelRecords);
    hotelRecords.forEach((hotel) => {
        const comuneFromHotel = hotel.Comune.trim();
        const stelleFromHotel = hotel['Stelle struttura'];
        const fasciaFromHotel = hotel['Prezzo Minore'];
        const distance_hotel = getDistance(hotel);

        let condition = false;

        /*
        if(lastChanged==="comune") condition = comuneFromHotel===comune.name
         */

        switch (lastChange) {
            case 'comune':
                if (comune.name === "Tutta l'isola") condition = true;
                else condition = comuneFromHotel === comune.name;
                break;

            case 'stelle':
                if (stelle.name === 'Tutti') condition = true;
                else condition = stelleFromHotel === stelle.name;
                break;

            case 'distance':
                if (distance.value === 0) condition = true;
                else if (distance.value === 1) {
                    condition = distance_hotel >= 0 && distance_hotel < 500;
                } else if (distance.value === 2) {
                    condition = distance_hotel >= 500 && distance_hotel <= 1000;
                } else if (distance.value === 3) {
                    condition = distance_hotel > 1000;
                }

                break;

            case 'fascio':
                if (fascio.value === 0) condition = true;
                else if (fascio.value === 1) condition = fasciaFromHotel < 40;
                else if (fascio.value === 2) condition = fasciaFromHotel >= 40 && fasciaFromHotel <= 80;
                else if (fascio.value === 3) condition = fasciaFromHotel > 80;
                break;

            default:
                condition = true;
                break;
        }
        // {
        //     name: 'fino a 40€',
        //     value: 1,
        // },
        // {
        //     name: 'tra 40€ e 80€',
        //     value: 2,
        // },
        // {
        //     name: 'più di 80€',
        //     value: 3,
        // },

        let conditionStelle = lastChange === 'stelle' || condition;
        let conditionComune = lastChange === 'comune' || condition;
        let conditionFascia = lastChange === 'fascio' || condition;
        let conditionDistance = lastChange === 'distance' || condition;

        if (!stelles.includes(stelleFromHotel) && conditionStelle) stelles.push(stelleFromHotel);

        if (!comunes.includes(comuneFromHotel) && conditionComune) comunes.push(comuneFromHotel);

        if (conditionFascia) {
            if (fasciaFromHotel < 40 && !fascias.includes('fino a 40€')) {
                fascias.push('fino a 40€');
                fasciasWithName.push({ name: 'fino a 40€', value: 1 });
            }
            if (fasciaFromHotel >= 40 && fasciaFromHotel <= 80 && !fascias.includes('tra 40€ e 80€')) {
                fascias.push('tra 40€ e 80€');
                fasciasWithName.push({ name: 'tra 40€ e 80€', value: 2 });
            }
            if (fasciaFromHotel > 80 && !fascias.includes('più di 80€')) {
                fascias.push('più di 80€');
                fasciasWithName.push({ name: 'più di 80€', value: 3 });
            }
        }

        // {
        //     name: '0 mt - 500 mt',
        //     value: 1,
        // },
        // {
        //     name: '500 mt - 1 km',
        //     value: 2,
        // },
        // {
        //     name: '1 km+',
        //     value: 3,
        // },
        if (conditionDistance) {
            if (distance_hotel >= 0 && distance_hotel < 500 && !distances.includes('0 mt - 500 mt')) {
                distances.push('0 mt - 500 mt');
                distancesWithName.push({ name: '0 mt - 500 mt', value: 1 });
            } else if (distance_hotel >= 500 && distance_hotel < 1000 && !distances.includes('500 mt - 1 km')) {
                distances.push('500 mt - 1 km');
                distancesWithName.push({ name: '500 mt - 1 km', value: 2 });
            } else if (distance_hotel > 1000 && !distances.includes('1 km+')) {
                distances.push('1 km+');
                distancesWithName.push({ name: '1 km+', value: 3 });
            }
        }
    });

    let comunesWithName = comunes.map((comune) => ({ name: comune }));
    let stellesWithName = stelles.map((stelle) => ({ name: stelle }));

    comunesWithName = comunesWithName.sort((a, b) => (a.name === comune.name ? -1 : 1));
    fasciasWithName = fasciasWithName.sort((a, b) => {
        if (a.name === fascio.name) return -1;
        if (b.name === fascio.name) return 1;
        return a.value - b.value;
    });
    stellesWithName = [
        { name: 'Tutti' },
        ...stellesWithName.slice(1).sort((a, b) => {
            let stellevalueA = parseInt(a.name.split(' '));
            let stellevalueB = parseInt(b.name.split(' '));
            return stellevalueA - stellevalueB;
        }),
    ];

    distancesWithName = distancesWithName.sort((a, b) => {
        if (a.name === distance.name) return -1;
        if (b.name === distance.name) return 1;
        return a.value - b.value;
    });

    // const filters = {
    //     comunes:
    //         lastChange === 'comune'
    //             ? comune.name === "Tutta l'isola"
    //                 ? comunesWithName
    //                 : currentComunes
    //             : comunesWithName,
    //     stelles:
    //         lastChange === 'stelle' ? (stelle.name === 'Tutti' ? stellesWithName : currentStelles) : stellesWithName,
    //     fascias: lastChange === 'fascio' ? (fascio.value === 0 ? fasciasWithName : currentFascio) : fasciasWithName,
    //     distances:
    //         lastChange === 'distance' ? (distance.value === 0 ? distances : currentDistances) : distancesWithName,
    // };

    if (!sortedHotelsOnDistanzaMare.length)
        return res.status(200).json({
            hotels: [],
            filters,
        });

    let hotelWithLowestDistanzaMare = { ...sortedHotelsOnDistanzaMare[0], ticker: 'Più vicino al mare' };

    const sortedHotelsOnPriorita = sortRecordsOnPriorita(sortedHotelsOnDistanzaMare.slice(1));

    if (!sortedHotelsOnPriorita.length)
        return res.status(200).json({
            hotels: [hotelWithLowestDistanzaMare],
            filters,
        });

    let hotelWithLowestPriorita = { ...sortedHotelsOnPriorita[0], ticker: 'Più Venduto' };

    const sortedHotelsOnPrezzo = sortedHotelsOnPriorita.slice(1).sort((a, b) => {
        let prezzoA = a['Prezzo Minore'];
        let prezzoB = b['Prezzo Minore'];
        if (!prezzoA) return 1;
        if (!prezzoB) return -1;

        return prezzoA - prezzoB;
    });

    if (!sortedHotelsOnPrezzo.length)
        return res.status(200).json({
            hotels: [hotelWithLowestDistanzaMare, hotelWithLowestPriorita],
            filters,
        });
    let hotelWithLowestPrezzo = { ...sortedHotelsOnPrezzo[0], ticker: 'Prezzo più basso' };

    let remainingRecords = sortRecordsOnPriorita(sortedHotelsOnPrezzo.slice(1));

    return res.status(200).json({
        hotels: [hotelWithLowestDistanzaMare, hotelWithLowestPriorita, hotelWithLowestPrezzo, ...remainingRecords],
        filters,
    });
    //  filter hotels with given other filters

    // send hotel
});
