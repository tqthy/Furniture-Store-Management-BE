import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./config/connectDB";
import express from "express";
import bodyParser from "body-parser";
import config from "./routes/index";
import seddData from "./config/initializerDb";
// import catalogueRoute from "./routes/CatalogueRoute";
// import { checkUserJwt } from "./middlewares/jwtService";
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        // origin: process.env.URL_FRONTEND,
        origin: (origin, callback) => {
            callback(null, true); // Dynamically allow all origins
        },
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    })
);

Connection();
seddData.seedAccount();
// use middleware
// import path here
config.authRoute(app);
config.catalogueRoute(app);
config.productRoute(app);
config.goodsReceiptRoute(app);
config.ProductVariantRoute(app);
config.invoiceRoute(app);
config.providerRoute(app);
config.customerRoute(app);
config.promotionRoute(app);
config.fileRoute(app);
config.maintainanceRoute(app);
config.staffRoute(app);
config.reportRoute(app);
config.authorizationRoute(app);

app.use('/order-vnpay', require('./routes/order-vnpay'));
app.use('/order-momo', require('./routes/order-momo'));

app.use((req, res) => {
    return res.send("404 not found");
});
app.listen(PORT, () => {
    console.log("backend is running in port: " + PORT);
});
