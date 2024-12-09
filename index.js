

const express = require('express')
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const restaurantRoute = require('./routes/restaurantRoute');
const menuRoutes = require('./routes/menuRoutes'); // Import menuRoutes
const cartRoutes = require('./routes/cartRoutes'); // Import cart routes
const checkoutRoutes = require('./routes/checkoutRoutes'); // Adjust path if necessary
const app = express()

connectToDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/menus', menuRoutes); // Add menuRoutes
app.use('/api/cart', cartRoutes); // Use cart routes
app.use('/api', checkoutRoutes);
app.get('/',(req,res) =>{
    res.status(200).send({message:'Sucess'})
} )
app.listen(5000,() =>{
    console.log("server is running on port - 5000")
})