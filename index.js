

const express = require('express')
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express()
connectToDB();


app.use('/api/users', userRoutes);
app.get('/',(req,res) =>{
    res.status(200).send({message:'Sucess'})
} )
app.listen(5000,() =>{
    console.log("server is running on port - 5000")
})