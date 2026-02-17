const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const isLoggedIn = require('../middleware/isLoggedIn');

// וודא שהקונטרולר נטען
if (!cartController) {
    console.error("Cart Controller not found!");
}

router.use(isLoggedIn); 

// נתיבים
router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/', cartController.removeFromCart);


module.exports = router; 