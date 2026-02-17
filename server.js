require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const isLoggedIn = require('./middleware/isLoggedIn');
const cartRoutes = require('./routes/cartRoutes');

// ייבוא הראוטים 
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// חיבור ל-DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gameStoreDB");
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

connectDB();


// כל בקשה שמתחילה ב-/api/auth תלך לקובץ הראוטים שלנו
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


app.get('/', (req, res) => {
    res.send('Game Store API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/secret', isLoggedIn, (req, res) => {
    res.send(`Welcome inside, user ID: ${req.user._id}`);
});