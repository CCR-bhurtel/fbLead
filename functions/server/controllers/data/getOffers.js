const { default: axios } = require('axios');
const {
    NINOX_BASE_API,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
    NINOX_HOTEL_OFFERTE_TABLE_ID,

    NINOX_API_KEY,
} = require('../../../config/keys');
const catchAsync = require('../../utils/catchAsync');

let baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;

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

exports.calculateDaysAndNights = calculateDaysAndNights;

const fetchOffers = async (offertaIds) => {
    const offers = [];

    for (let i = 0; i < offertaIds.length; i++) {
        try {
            const response = await axios.get(
                `${baseNinoxTableURL}/${NINOX_HOTEL_OFFERTE_TABLE_ID}/records/${offertaIds[i]}`,
                {
                    headers: {
                        Authorization: `Bearer ${NINOX_API_KEY}`,
                    },
                }
            );

            offers.push({ id: response.data.id, ...response.data.fields });
        } catch (err) {
            continue;
        }
    }

    return offers;
};

module.exports = catchAsync(async (req, res, next) => {
    const { checkInDate, checkOutDate, offertaIds } = req.body;

    const inDate = new Date(checkInDate);

    const outDate = new Date(checkOutDate);

    const { nights } = calculateDaysAndNights(inDate, outDate);
    const fetchedOffers = await fetchOffers(offertaIds);

    const offers = fetchedOffers.filter((offer) => {
        const minNights = parseInt(offer['minimo notti']);
        const maxNights = parseInt(offer['massimo notti']);

        if (nights > 7) {
            if (minNights >= 7 || maxNights >= 7) {
                return true;
            }
        } else {
            if (nights - 1 <= minNights && nights + 1 >= minNights) {
                return true;
            } else if (nights - 1 <= maxNights && nights + 1 >= maxNights) {
                return true;
            }
        }
        return false;
    });

    // const getPriceForOffer = (offer) => {
    //     const bb = parseFloat(offer['Prezzo BB']);
    //     const hb = parseFloat(offer['Prezzo HB']);
    //     const fb = parseFloat(offer['Prezzo FB']);

    //     let price;

    //     if (offer['Tipo offerta'] === 'Costo giornaliero') {
    //         price = bb || hb || fb;
    //     } else if (offer['Tipo offerta'] === 'Totale offerta') {
    //         let prezzoLow = bb || hb || fb;

    //         price = (prezzoLow / offer['minimo notti']).toFixed(2);
    //     }

    //     return price;
    // };

    const getPriceForOfferWithBoardOption = (optionPrice, offer) => {
        let totalPrice;
        let totalNights;
        const minNights = parseInt(offer['minimo notti']);
        const maxNights = parseInt(offer['massimo notti']);
        if (minNights === maxNights) {
            totalNights = minNights;
        } else {
            if (nights >= minNights && nights <= maxNights) {
                totalNights = nights;
            } else {
                totalNights = nights;
            }
        }

        if (offer['Tipo offerta'] === 'Costo giornaliero') {
            totalPrice = optionPrice * totalNights;
        } else if (offer['Tipo offerta'] === 'Totale offerta') {
            totalPrice = totalNights === minNights ? optionPrice : (optionPrice / minNights) * nights;
        }

        return totalPrice;
    };

    const offersWithPriceAndTimeDifference = offers.map((offer) => {
        const dateA = new Date(offer['Valida dal']);

        const dateB = new Date(offer['Valida al']);
        // const timeDifference = Math.abs(new Date(offer['Valida dal']) - new Date(inDate));

        let priceOption;

        const minNights = parseInt(offer['minimo notti']);
        const maxNights = parseInt(offer['massimo notti']);
        if (minNights === maxNights) {
            priceOption = 1;
            offer.dateString = `${minNights} Nights`;
        } else {
            if (nights >= minNights && nights <= maxNights) {
                priceOption = 2;
                offer.dateString = `${nights} Nights`;
            } else {
                priceOption = 3;
                offer.overFlow = true;

                offer.dateString =
                    Math.abs(minNights - nights) < Math.abs(maxNights - nights)
                        ? `${minNights} Nights `
                        : `${maxNights} Nights`;
            }
        }
        const selectItems = [];

        const bb = parseFloat(offer['Prezzo BB']);
        const hb = parseFloat(offer['Prezzo HB']);
        const fb = parseFloat(offer['Prezzo FB']);

        if (fb && fb > 0) {
            let price = getPriceForOfferWithBoardOption(fb, offer, priceOption);

            selectItems.push({ text: 'Pensione Completa', price });
        }

        if (bb && bb > 0) {
            selectItems.push({
                text: 'Bed & Brekfast',
                price: getPriceForOfferWithBoardOption(bb, offer, priceOption),
            });
        }

        if (hb && hb > 0) {
            selectItems.push({
                price: getPriceForOfferWithBoardOption(hb, offer, 3),
                text: 'Mexxa Pensione',
            });
        }

        return {
            ...offer,
            selectedOption: 0,

            selectItems,
            startDate: `${dateA.toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
            })}`,
            endDate: `${dateB.toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
            })}`,
        };
    });

    const sortedOffersWithTimeDifference = offersWithPriceAndTimeDifference.sort((a, b) => {
        const startDateA = new Date(a['Valida dal']);
        const endDateA = new Date(a['Valida al']);
        const startDateB = new Date(b['Valida dal']);
        const endDateB = new Date(b['Valida al']);

        const startDiffA = startDateA - inDate;
        const startDiffB = startDateB - inDate;
        const endDiffA = endDateA - outDate;
        const endDiffB = endDateB - outDate;

        if (startDiffA <= 0 && startDiffB > 0) {
            //&& condA && !condB
            return -1;
        }

        if (startDiffA > 0 && startDiffB <= 0) {
            //&& condB && !condA
            return 1;
        }

        // if (condA && !condB) {
        //     return -1;
        // }

        // if (condB && !condA) {
        //     return 1;
        // }

        const diffA = Math.abs(startDiffA) + Math.abs(endDiffA);
        const diffB = Math.abs(startDiffB) + Math.abs(endDiffB);

        return diffA - diffB;
    });

    // Valida dal, Valida al, minimo notti, massimo notti

    return res.status(200).json({ offers: sortedOffersWithTimeDifference, nights });
});
