const Cart = require('../models/cartModel');
const Check = require('../models/checkModel'); // Using CheckModel now

exports.checkout = async (req, res) => {
    const { userId, paymentDetails } = req.body; // Include paymentDetails for actual payment gateway integration.

    try {
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.menuItem');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart is empty or not found' });
        }

        // Calculate total cost
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + item.menuItem.price * item.quantity;
        }, 0);

        // Simulate payment process (or integrate a payment gateway like Stripe)
        const paymentStatus = 'Success'; // Replace with actual payment gateway response.

        // Create a check record
        const check = new Check({
            userId,
            items: cart.items,
            totalAmount,
            paymentStatus,
        });
        await check.save();

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(200).json({
            message: 'Checkout successful',
            checkDetails: {
                checkId: check._id,
                totalAmount,
                paymentStatus,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Checkout failed', error });
    }
};
