const { default: axios } = require('axios');
const {
    NINOX_BASE_API,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
    NINOX_FIRST_TABLE_ID, // angrafiche
    NINOX_THIRD_TABLE_ID, // personalizatti
    NINOX_API_KEY,
} = require('../../../config/keys');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

let baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;

const getAllWithPhone = async (phone) => {
    try {
        const response = await axios.get(
            `${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records?filters={"D":${phone}}`,

            {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
            }
        );
        return response.data;
    } catch (err) {
        console.log(err.response?.data);
    }
};

const postAnagrafiche = async (data) => {
    // create data if not
    const response = await axios.post(
        `${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records`,
        {
            fields: { ...data },
        },
        {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
        }
    );

    return response.data.id;
};
const postDataPersonalizatti = async (data) => {
    const response = await axios.post(
        `${baseNinoxTableURL}/${NINOX_THIRD_TABLE_ID}/records`,
        {
            fields: { ...data },
        },
        {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
        }
    );

    return response.data.id;
};

const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat); // Current date and time

    // Get the individual components of the date

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Combine the components into a simple string representation
    const dateString = `${day}.${month}`;
    return dateString;
};

function calculateNights(startDate, endDate) {
    // Convert the dates to milliseconds
    const startMillis = new Date(startDate).getTime();
    const endMillis = new Date(endDate).getTime();

    // Calculate the time difference in milliseconds
    const timeDiffMillis = endMillis - startMillis;

    var numberOfNights = Math.floor(timeDiffMillis / (1000 * 3600 * 24));

    return { nights: numberOfNights };
}

// 2023-07-17 2023-07-14
module.exports = catchAsync(async (req, res, next) => {
    const {
        Nome,
        Cognome,
        Email,
        Phone,
        postedDate,
        arrival,
        departure,
        packageBoard,
        rooms,
        Citta,
        note,
        NomeModulo,
        Hotel,
        pricePerPerson,
    } = req.body;

    if (!Nome || !Cognome || !Email || !Phone) return next(new AppError('Please provide required data', 400));
    if (!rooms.length) {
        return next(new AppError('Please select a room', 400));
    }

    const recordsWithPhoneNumber = await getAllWithPhone(Phone);
    let anagraficheId;
    if (recordsWithPhoneNumber.length) {
        anagraficheId = recordsWithPhoneNumber[0]._id;
    } else {
        anagraficheId = await postAnagrafiche({
            Nome,
            Cognome,
            Phone,
            Email,
        });
    }

    const arrivalDate = arrival ? formatDate(arrival) : '';
    const departureDate = departure ? formatDate(departure) : '';

    const { nights } = calculateNights(arrival, departure);

    let tipi = '';

    rooms.forEach((room, i) => {
        let tipiForRoom = `stanza ${i + 1} | ${room.noofAdults} adulti ${
            room.noofChildren ? `-${room.noofChildren} (${room.ages.join('-')})` : ''
        }}, `;
        tipi += tipiForRoom;
    });
    let agesOfBambani = rooms[0].ages ? rooms[0].ages.sort((a, b) => a - b) : [];
    let minAgeOfBambini = agesOfBambani[0];
    let maxAgeOfBambini = agesOfBambani[agesOfBambani.length - 1];

    tipi += rooms[0].noofAdults ? `${rooms[0].noofAdults} adulti ` : '';
    tipi += rooms[0].noofChildren ? `- ${rooms[0].noofChildren} bambini` : '';

    if (agesOfBambani.length === 1) {
        tipi += ` (${maxAgeOfBambini})`;
    } else if (agesOfBambani.length > 1) {
        tipi += ` (${minAgeOfBambini}-${maxAgeOfBambini})`;
    }
    const data = {
        Modulo: NomeModulo,
        'Data e Ora': new Date(postedDate),
        'Città di Partenza': Citta && Citta.length ? Citta : 'Nessun Viaggio Incluso',
        'Tipi di Camera': tipi,
        'Periodo Soggiorno': `${departureDate} - ${arrivalDate} - ${nights} notti - € ${pricePerPerson} -${packageBoard}`,
        Hotel,
        'Note Richieste': note,

        Nome,
        Cognome,
        Phone,
        Email,
        Anagrafiche: anagraficheId,
    };

    const response = await postDataPersonalizatti(data);
    return res.status(200).json({ id: response });

    // the Rooms field is the list of room and contains:-
    // {noOfAdults:2, noOfChildren:2, ages:[12, 7]}
});
