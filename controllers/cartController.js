const Cart = require('../models/cartModel');

// Add a menu item to the cart
exports.addToCart = async (req, res) => {
    const { userId, menuItemId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the menu item already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);

        if (itemIndex > -1) {
            // If item exists, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If item does not exist, add it to the cart
            cart.items.push({ menuItem: menuItemId, quantity });
        }

        await cart.save();

        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item to cart', error });
    }
};



// Remove a menu item from the cart
exports.removeFromCart = async (req, res) => {
    const { userId, menuItemId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the menu item from the cart
        cart.items = cart.items.filter(item => item.menuItem.toString() !== menuItemId);

        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item from cart', error });
    }
};



// Update the quantity of a menu item in the cart
exports.updateCartItemQuantity = async (req, res) => {
    const { userId, menuItemId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the menu item and update its quantity
        const item = cart.items.find(item => item.menuItem.toString() === menuItemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({ message: 'Item quantity updated', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update item quantity', error });
    }
};


// Get all cart items for a user
exports.getCartItemsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.menuItem');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve cart items', error });
    }
};