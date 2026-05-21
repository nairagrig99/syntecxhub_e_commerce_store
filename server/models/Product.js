const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be less than 0'],
        default: 0
    },
    countInStock: {
        type: Number,
        required: [true, 'Please add stock count'],
        min: [0, 'Stock cannot be less than 0'],
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('Products', ProductSchema)