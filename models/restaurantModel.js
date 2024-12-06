
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name : {type: String, required: true},
    rating: {type: Number, default:0},
    menuItems: [{type:mongoose.Schema.ObjectId,ref: 'MenuItem'}]
})


