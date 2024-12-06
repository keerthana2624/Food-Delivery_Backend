

const express = require('express')
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const restaurantRoute = require('./routes/restaurantRoute');
const app = express()

connectToDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/restaurant', restaurantRoute);

app.get('/',(req,res) =>{
    res.status(200).send({message:'Sucess'})
} )
app.listen(5000,() =>{
    console.log("server is running on port - 5000")
})