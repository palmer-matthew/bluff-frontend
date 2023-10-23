const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, () => {
    console.log(`@${Date(Date.now()).toString()}: Server is running on PORT:${8080}`);
});