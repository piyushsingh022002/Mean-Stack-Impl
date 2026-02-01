import dotenv from "dotenv";

import express from "express"
import notesRoutes from "./Routes/notesRoutes.js"
import authRoutes from "./Routes/authRoutes.js"
// const express = require("express");
import connectDB from "./configs/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config({ override: true });

// console.log(process.env.MONGO_URI);
const app = express();
const port = process.env.PORT || 5001;
 connectDB();

 app.use(express.json()); //this middleware will parse json body

 //middle ware to log request details
 app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
 })

 //app.use(rateLimiter); // applying rate limiter middleware globally

 app.use("/api/auth", authRoutes);

//whenever request comes from an url, which starts from /api/notes, it will be handled by notesRoutes
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
    console.log(`server Started on port ${port}`);
})