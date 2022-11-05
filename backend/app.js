import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


mongoose
    .connect(
        "mongodb+srv://admin:Y0qWQCzW0vTRjMR1@cluster0.16z4q.mongodb.net/Blog?retryWrites=true&w=majority"
        ).then(()=>app.listen(5000))
        .then(()=>
        console.log("Server started at 5000")
        )
        .catch(err => console.log(err));