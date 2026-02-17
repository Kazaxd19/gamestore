const Cart = require('../models/Cart');

// 1. קבלת העגלה
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch cart" });
    }
};

// 2. הוספה לעגלה
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId == productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        } else {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        }

        await cart.save();
        res.status(200).json({ message: "Cart updated", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not add to cart" });
    }
};

// 3. מחיקה מהעגלה 
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // סינון הפריט החוצה
        cart.items = cart.items.filter(item => !item.productId.equals(productId));

        await cart.save();
        res.status(200).json({ message: "Product removed", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not remove product" });
    }
};