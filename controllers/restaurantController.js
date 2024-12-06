const MenuItem = require('../models/menuModel');
const Restaurant = require('../models/restaurantModel');

exports.addNewRestaurant = async (req, res) => {
    const{name, rating, menuItems} = req.body;
    
    try {
        const newRestaurant = new Restaurant({name, rating});
    await newRestaurant.save();
    
    const menuItemsDocs = await  MenuItem.insertMany(
        menuItems.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            restaurant: newRestaurant._id
        }))
    );

    newRestaurant.menuItems = menuItemsDocs.map(item => item._id);
    await newRestaurant.save();

    res.status(201).json({
        message:"Restaurant created successfully",
        restaurant: newRestaurant,
        menuItems: menuItemsDocs
    });

    } catch (error) {
       res.status(500).json({message: "Mongo DB is down, please try again later", error});
    }
    
    
}

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate('menuItems');
        if(!restaurant) return res.status(400).json({message:"Restaurant not found"})
        res.status(200).json(restaurant);   
    } catch (error) {
        res.status(500).json({message: "Mongo DB is down, please try again later", error});
     }
}

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('menuItems');
        res.status(200).json(restaurants); 

    } catch (error) {
        res.status(500).json({message: "Mongo DB is down, please try again later", error});
    }
}

exports.updateRestaurant = async (req, res) => {
    try {
        // const {name, rating} = req.body;
        const restaurantId = req.params.id;
        
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body);
        if(!restaurant) return res.status(400).json({message:"Restaurant not found"});
        res.status(200).json({message: "Upadated successfully", restaurantInfo: restaurant});
    } catch (error) {
        res.status(500).json({message: "Mongo DB is down, please try again later", error});
    }
}