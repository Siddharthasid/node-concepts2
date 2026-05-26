import express from "express";
import dotenv from "dotenv";
import winston, { transports } from 'winston'
import expressWinston from "express-winston";
import "winston-mongodb";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// mongoose.connect(process.env.DBCONFIG).then(() => {
//     console.log("Connected to MongoDB");
// }).catch((err) => {
//     console.log(err);
// });

app.use(express.json())

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'warningLogger.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'errorLogger.log'
        }),
        // new transports.MongoDB({
        //     db: process.env.DBCONFIG, //mongodb database url
        //     "collection": "logs"
        // })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    statusLevels: true
}));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/health', (req, res) => {
    res.status(200).json({ message: "Status is OK" })
});

app.get('/warning', (req, res) => {
    res.status(400).json({ message: "This is a warninng." })
});


app.get('/error', (req, res) => {
    res.status(500).json({ message: "This is an error." })
});


app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:3000");
});