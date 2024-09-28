import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./config/connectDB";
import express from "express";
import bodyParser from "body-parser";
// import { checkUserJwt } from "./middlewares/jwtService";
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.URL_FRONTEND,
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    })
);

Connection();
// use middleware
// import path here

app.use((req, res) => {
    return res.send("404 not found");
});
app.listen(PORT, () => {
    console.log("backend is running in port: " + PORT);
});
