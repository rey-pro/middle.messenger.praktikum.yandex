require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.EXPRESS_PORT;

app.use(express.static('./dist/'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
app.get(`/:name`, (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
})