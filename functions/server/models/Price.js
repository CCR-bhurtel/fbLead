const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    data: [
        {
            type: mongoose.Schema.Types.Mixed,
        },
    ],
});

const PriceMedium = mongoose.model('PriceMedium', priceSchema);

module.exports = PriceMedium;
