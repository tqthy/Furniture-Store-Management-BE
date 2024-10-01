import { query } from "express";

const { Sequelize } = require("sequelize");
require("dotenv").config();

const databasename = process.env.DATABASENAME;
const databaseuser = process.env.DATABASEUSERNAME;
const databasepassword = process.env.DATABASEPASSWORD;
const databasehost = process.env.DATABASEHOST;
const databaseport = process.env.DATABASEPORT;
const databasedialect = process.env.DATABASEDIALECT;

const sequelize = new Sequelize(
    databasename,
    databaseuser,
    databasepassword,
    {
        host: databasehost,
        port: databaseport,
        dialect: databasedialect,
        logging: false,
        define: {
            freezeTableName: true,
        },
        query: { raw: true },
    }
);

const Connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default Connection;