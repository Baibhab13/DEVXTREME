const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FarmCart")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Failed to connect");
    });

    const LoginSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true // Ensure phone numbers are unique
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["farmer", "consumer"] // Ensures the role is either "farmer" or "consumer"
        }
    });

const collection = mongoose.model("Collection1", LoginSchema);

module.exports = collection;