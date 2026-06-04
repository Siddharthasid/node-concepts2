const express = require('express');
const dotenv = require('dotenv');
const publish = require('./pub-sub/publish');
const subscribe = require('./pub-sub/subscribe');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/send', publish);

app.get('/health', (req, res) => {
    res.status(200).json({message: "Status is OK."})
});

setInterval(() => {
    subscribe();
}, 1000);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
