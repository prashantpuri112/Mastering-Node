const fs = require('fs');
const express = require('express');
const app = express();

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'); // read the file and store it in a variable

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,  // req.requestTime is a new property we created in the middleware function
        results: tours.length, // number of tours
        data: {
            tours
        }
    });
});

const port = 3000;

app.listen(3000, () => {
    console.log('App running on port 3000...');
});