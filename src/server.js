import express from "express";
import requestIdMiddleware from "./middleware/requestIdMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";


import notesRoutes from "./Routes/notesRoutes.js"
import authRoutes from "./Routes/authRoutes.js"

import connectDB from "./configs/db.js";

dotenv.config({ override: true });

// console.log(process.env.MONGO_URI);
const app = express();

const port = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use(requestIdMiddleware);

//middle ware to log request details
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}, with Request ID: ${res.locals.requestId}`);
    next();
 })

//app.use(rateLimiter)

app.use("/api/auth", authRoutes);

//whenever request comes from an url, which starts from /api/notes, it will be handled by notesRoutes
app.use("/api/notes", notesRoutes);

//global error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server Started on port ${port}`);
});