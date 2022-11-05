import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
import dotenv from "dotenv";

//require("dotenv").config();
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


mongoose
    .connect(
        "mongodb+srv://admin:Y0qWQCzW0vTRjMR1@cluster0.16z4q.mongodb.net/Blog?retryWrites=true&w=majority"
        ).then(()=>app.listen(process.env.PORT))
        .then(()=>
        console.log("Server started at ", process.env.PORT)
        )
        .catch(err => console.log(err));