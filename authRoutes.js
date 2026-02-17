const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController'); 

// בדיקה שהקונטרולר הוטען כמו שצריך
if (!authController || !authController.signup) {
    console.error("Error: authController not found or missing signup function");
}

router.post('/signup', authController.signup);
router.post('/login', authController.login);


module.exports = router;