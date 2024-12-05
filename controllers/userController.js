

const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    const newUser = new User({
        name,
        email,
        password
    })
    await newUser.save();
       

    res.status(200).json({message:'Gotchal'});
}