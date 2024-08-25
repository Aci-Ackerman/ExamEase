// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");
const home = require("./controllers/homeControllers");

// Create an app object
const app = express();

// Config
app.use(express.json());
app.use(cookieParser());

// Connect to database
connectToDb();

// Routes
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/check-auth", requireAuth, usersController.checkAuth)
app.get("/logout", usersController.logout);
app.get("/home/:id",home);

// Debugging routes
app.post("/debug/checkuser", usersController.checkUser);
app.post("/debug/deluser", usersController.delUser);
app.get("/debug/showall", usersController.showAllUsers);


// Start server
app.listen(process.env.PORT);
