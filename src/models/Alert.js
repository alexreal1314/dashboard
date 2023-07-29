const mongoose = require('mongoose');
const SeverityTypes = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
};

const AlertSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
        },
        severity: {
            type: String,
            enum: Object.values(SeverityTypes),
            required: true,
            index: 'text',
        },
        type: {
            type: String,
            required: true,
        },
        sourceType: {
            type: String,
            required: true,
        },
        networkType: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        usePushEach: true,
    }
);

const AlertModel = mongoose.model('Alert', AlertSchema);
module.exports.AlertModel = AlertModel;