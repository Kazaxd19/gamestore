const isAdmin = (req, res, next) => {
    // אנחנו מניחים שכבר עברנו את isLoggedIn, אז יש לנו את req.user
    if (req.user && req.user.role === 'admin') {
        next(); // יש אישור, תמשיך
    } else {
        res.status(403).json({ error: "Access Denied: Admins Only" }); // אין אישור
    }
};

module.exports = isAdmin;