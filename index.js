

const express = require('express')
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const restaurantRoute = require('./routes/restaurantRoute');
const menuRoutes = require('./routes/menuRoutes'); // Import menuRoutes
const app = express()

connectToDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/menus', menuRoutes); // Add menuRoutes

app.get('/',(req,res) =>{
    res.status(200).send({message:'Sucess'})
} )
app.listen(5000,() =>{
    console.log("server is running on port - 5000")
})