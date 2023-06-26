const mongoose = require('mongoose');

const ninoxMapSchema = new mongoose.Schema({
    tableName: {
        type: String,
        index: true,
        required: [true, 'please enter table name'],

        unique: [true, 'the table name is already used'],
    },
    templateName: { type: String, required: [true, 'please enter template name'] },
    templateMaps: [
        {
            type: { type: String },
            display: { type: String },
            parameters: {
                type: mongoose.Schema.Types.Mixed,
            },
        },
    ],
    contactMaps: {
        type: mongoose.Schema.Types.Mixed,
        custom_praticaconfermata: Boolean,
    },
});

ninoxMapSchema.index({
    tableName: 'text',
});

const NinoxMap = mongoose.model('NinoxMap', ninoxMapSchema);

module.exports = NinoxMap;
