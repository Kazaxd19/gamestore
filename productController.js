const Product = require('../models/Product');
const Joi = require('joi');

// ולידציה למוצר חדש
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().required() 
});

// 1. הוספת מוצר חדש
exports.createProduct = async (req, res) => {
    try {
        // בדיקת קלט
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const product = new Product(req.body);
        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        res.status(500).json({ error: "Could not create product" });
    }
};

// 2. קבלת כל המוצרים
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch products" });
    }
};