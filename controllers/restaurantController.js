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
        const restaurant = await Restaurant.findById(restaurantId);
        res.status(200).json(restaurant);   
    } catch (error) {
        res.status(500).json({message: "Mongo DB is down, please try again later", error});
     }
}