const MenuItem = require('../models/menuModel');
const Restaurant = require('../models/restaurantModel');



// Add a new menu item
exports.addMenuItem = async (req, res) => {
    const { name, description, price, imageUrl, restaurantId } = req.body;

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const newMenuItem = new MenuItem({
            name,
            description,
            price,
            imageUrl,
            restaurant: restaurantId,
        });

        await newMenuItem.save();

        // Add menu item to the restaurant's menu
        restaurant.menuItems.push(newMenuItem._id);
        await restaurant.save();

        res.status(201).json({ message: 'Menu item added successfully', menuItem: newMenuItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add menu item', error });
    }
};


// Get all menu items for a specific restaurant
exports.getMenuItemsByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const menuItems = await MenuItem.find({ restaurant: restaurantId });
        if (!menuItems.length) {
            return res.status(404).json({ message: 'No menu items found for this restaurant' });
        }

        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve menu items', error });
    }
};



// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { menuItemId } = req.params;
    const updateData = req.body;

    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(menuItemId, updateData, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update menu item', error });
    }
};

