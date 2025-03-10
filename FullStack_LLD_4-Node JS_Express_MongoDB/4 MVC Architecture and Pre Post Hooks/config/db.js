const mongoose = require('mongoose');

const db_password = "hU4O2at0gNYmxmCR";

// connect to the database
const dbURL = `mongodb+srv://arjunviswaa:${db_password}@cluster0.4xxyxyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connectDB = async() => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to the database");
    } catch(e) {
        console.log("Error");
    }
}

module.exports = connectDB;