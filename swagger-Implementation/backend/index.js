import express from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

import swaggerOptions from './swagger.json' assert { type: 'json' };
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * @swagger
 * /example:
 *   get:
 *     summary: hello world
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: says Hello World
 */
app.get('/', (req, res) => {
    res.send("Hello World!");
});

/**
 * @swagger
 * /example:
 *   get:
 *     summary: health check
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: sends the json as status ok
 */
app.get('/health', (req, res) => {
    res.status(200).json({ message: "Status is OK" })
});

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Get list of examples
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: List of examples retrieved successfully
 */
app.get('/example', (req, res) => {
    res.json({ message: 'List of examples retrieved successfully' });
});

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:3000");
});