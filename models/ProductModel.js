const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    imgURL: {
        type: String
    },
    productID: {
        type: String
    },
    displayPrice: {
        type: String
    },
    imgCollection: {
        type: Array
    },
    productDetail: {
        type: String
    },
    ratings: {
        type: Array
    },
    avgRating: {
        type: Array
    }
})

const newProduct = mongoose.model('products', productSchema)

module.exports = newProduct