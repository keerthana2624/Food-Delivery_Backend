const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true }, // e.g., 'Success', 'Failed'
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Check', checkSchema);
