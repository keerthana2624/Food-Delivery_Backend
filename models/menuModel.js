
const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    name:{type: String, require: true},
    price: {type: Number, required: true},
    imageUrl: {type: String},
    restaurant: {type: mongoose.Schema.Types.ObjectId,ref: 'Restaurant', required: true}
})

