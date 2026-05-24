const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const rateLimitter = rateLimit({
    windowMs: 1 * 60 * 1000, // 10 requests per limit
    max: 10
});

app.use(express.json());

app.use(rateLimitter); // adding rate limitter middleware

app.get('/health', (req, res) => {
    res.status(200).json({status: "OK"})
})

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
})