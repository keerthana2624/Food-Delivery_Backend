
const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    name:{type: String, require: true},
    description: {type: String},
    price: {type: Number, required: true},
    imageUrl: {type: String},
    restaurant: {type: mongoose.Schema.Types.ObjectId,ref: 'Restaurant', required: true}
})

module.exports = mongoose.model('MenuItem', menuItemsSchema);

