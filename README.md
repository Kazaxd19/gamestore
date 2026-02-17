# 🎮 GameStore API - Backend

A robust RESTful API for an online video game store, built with **Node.js**, **Express**, and **MongoDB**.
This project features secure user authentication, product management, and a fully functional shopping cart system.

## 🚀 Features

- **User Authentication:**
  - Secure Signup & Login.
  - Password hashing using `bcrypt`.
  - JWT (JSON Web Token) authentication via HTTP-Only Cookies.
- **Product Management:**
  - View all products (Public).
  - Create new products (**Admin only**).
- **Shopping Cart System:**
  - Add items to cart.
  - Remove items from cart.
  - View cart with populated product details (using Mongoose `populate`).
  - Persistent cart storage per user in MongoDB.
- **Security & Validation:**
  - Middleware for route protection (`isLoggedIn`, `isAdmin`).
  - Input validation using `Joi`.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), Cookies
- **Validation:** Joi
- **Tools:** Postman (for testing), Dotenv

## 📂 Project Structure

```bash
GameStore/
├── config/             # Database connection logic
├── controllers/        # Business logic (Auth, Cart, Products)
├── middleware/         # Auth & Admin verification
├── models/             # Mongoose schemas (User, Product, Cart)
├── routes/             # API routes definitions
├── schemas/            # Joi validation schemas
├── .env                # Environment variables
└── server.js           # Entry point

Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/YOUR-USERNAME/GameStore.git](https://github.com/YOUR-USERNAME/GameStore.git)
cd GameStore
Install dependencies:

Bash
npm install
Environment Variables:
Create a .env file in the root directory and add the following:

קטע קוד
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gameStoreDB
JWT_SECRET=your_super_secret_key_here
Run the server:

Bash
node server.js
# or if you use nodemon:
# npm start

 API Endpoints🔐 AuthenticationMethodEndpointDescriptionPOST/api/auth/signupRegister a new userPOST/api/auth/loginLogin and receive a JWT cookie

🎮 ProductsMethodEndpointDescriptionAccessGET/api/productsGet all gamesPublicPOST/api/productsAdd a new gameAdmin

🛒 Shopping CartMethodEndpointDescriptionAccessGET/api/cartGet user's cart (populated)UserPOST/api/cartAdd item to cartUserDELETE/api/cartRemove item from cartUser

🛡️ Admin Setup (Manual)
By default, new users are registered with the role user. To test Admin features (like creating products):

Register a new user.

Access your MongoDB database (via Compass or Shell).

Find the user in the users collection.

Change the role field from "user" to "admin".

Re-login to generate a new Admin Token.

👨‍💻 Author
Developed by Kaloyan - Full Stack Developer.
