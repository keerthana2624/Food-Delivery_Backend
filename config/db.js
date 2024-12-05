
const mongoose = require('mongoose')
mongo_conn_str = 'mongodb+srv://keerthikeerthana:keerthi2624@cluster0.nkt2a.mongodb.net/fooddelivery?retryWrites=true&w=majority&appName=Cluster0'

const connectToDB = async() => {
    try {
        await mongoose.connect(mongo_conn_str,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log('connected to mongo DB succesfully')
    } catch(err) {
       console.error('MongoDB Connection error:', err);
       process.exit(1)
    }
};


module.exports = connectToDB;