const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            title: {type: String, required: true},
            qty: {type: Number, required: true, default: 1},
            price: {type: Number, required: true},
            image: {type: String, required: true},
        },
    ]
}, {timestamps: true})

module.exports = mongoose.model('Cart', cartSchema)