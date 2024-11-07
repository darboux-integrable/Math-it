import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./config/database.js";
import bcrypt from "bcrypt";
import User from "./models/User.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    const password = req.body.password;
    
    try {
        // Encrypt the password. 
        req.body.password = await bcrypt.hash(password, 10);

        // Create the new user. 
        const newUser = await User.create(req.body);
        console.log("Successfully created a new user.")
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({success: false, message: "Error making new user: "  + error})
    }

    res.status(201).json(newUser);

});

app.listen(process.env.PORT, () => {
    connectToMongoDB();
    console.log("The server is running at " + process.env.PORT);
})

