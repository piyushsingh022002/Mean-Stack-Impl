import express from "express"
import notesRoutes from "./Routes/notesRoutes.js"
// const express = require("express");
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.MONGO_URI);
const app = express();
 connectDB();
//whenever request comes from an url, which starts from /api/notes, it will be handled by notesRoutes
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
    console.log("server Started on port 5001");
})