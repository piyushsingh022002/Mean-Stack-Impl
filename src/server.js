import express from "express"
import notesRoutes from "./Routes/notesRoutes.js"
// const express = require("express");
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.MONGO_URI);
const app = express();
const port = process.env.PORT || 5001;
 connectDB();

 app.use(express.json());
//whenever request comes from an url, which starts from /api/notes, it will be handled by notesRoutes
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
    console.log(`server Started on port ${port}`);
})