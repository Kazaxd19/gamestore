const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        // 1. בדיקה אם יש טוקן ב-Cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Access Denied: No Token Provided");
        }

        // 2. אימות הטוקן מול המפתח הסודי
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 3. שמירת פרטי המשתמש בתוך הבקשה (req)
        // כך שבפונקציה הבאה נוכל לדעת מי המשתמש
        req.user = payload; 

        // 4. מעבר לפונקציה הבאה
        next();

    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = isLoggedIn;
