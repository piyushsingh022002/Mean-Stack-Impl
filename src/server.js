import express from "express"
import notesRoutes from "./Routes/notesRoutes.js"
// const express = require("express");


const app = express();

//whenever request comes from an url, which starts from /api/notes, it will be handled by notesRoutes
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
    console.log("server Started on port 5001");
})