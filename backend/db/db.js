const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGO_URI;
        console.log("MongoDB URL:", mongoURL);
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

module.exports = connectDB;
