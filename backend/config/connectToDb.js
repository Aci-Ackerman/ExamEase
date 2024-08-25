// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}

// Import mongoose
const mongoose = require("mongoose");

// Connect to DB
async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb;