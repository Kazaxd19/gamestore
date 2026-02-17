const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const { signupSchema, loginSchema } = require('../schemas/userSchema'); 

exports.signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ error: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: 'user'
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login 
exports.login = async (req, res) => {
    try {
        // 1. בדיקת קלט
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // 2. בדיקה אם המשתמש קיים
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        // 3. בדיקת סיסמה 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid email or password" });

        // 4. יצירת הטוקן 
        const token = jwt.sign(
            { _id: user._id, role: user.role }, 
            process.env.JWT_SECRET,             
            { expiresIn: '7d' }                 
        );

        // 5. שליחת הטוקן בתוך Cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ message: "Logged in successfully", token: token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};