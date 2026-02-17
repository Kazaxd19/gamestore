const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const isLoggedIn = require('../middleware/isLoggedIn'); 
const isAdmin = require('../middleware/isAdmin');       

// הוספת מוצר: דורשת גם התחברות וגם אדמין
router.post('/', isLoggedIn, isAdmin, productController.createProduct);

// קבלת מוצרים: פתוח לכולם 
router.get('/', productController.getAllProducts);

module.exports = router;