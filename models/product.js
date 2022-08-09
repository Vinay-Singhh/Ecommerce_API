const mongoose = require('mongoose');
const sequencing = require("../config/sequencing");

const autoIncrement = require('mongoose-sequence')(mongoose);
const productSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
    __v: {
        type: Number,
        select: false
    }
},
    {
        _id: false,
        versionKey: false
    }
);

productSchema.plugin(autoIncrement);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;