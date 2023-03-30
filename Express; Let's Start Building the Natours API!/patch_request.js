const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // middleware to parse the body of the request

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`), 'utf-8'); // read the file and store it in a variable

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


app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params); // req.params is an object with the parameters from the URL
    const id = req.params.id * 1; // convert the id to a number
    const tour = tours.find(el => el.id === req.params.id * 1); // find the tour with the id from the URL

    if (id > tours.length) { // if the id is greater than the number of tours
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }


    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});



app.post('/api/v1/tours', (req, res) => {  // POST request
    // console.log(req.body); // req.body is undefined because we haven't parsed the body yet

    const newId = tours[tours.length - 1].id + 1; // create a new id
    const newTour = Object.assign({ id: newId }, req.body); // create a new object with the new id and the data from the request body

    tours.push(newTour); // push the new object to the tours array

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => { // write the new array to the file
        res.status(201).json({ // send a response
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    );

});

app.patch('/api/v1/tours/:id', (req, res) => { // PATCH request
    if (req.params.id * 1 > tours.length) { // if the id is greater than the number of tours
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
});

const port = 3000;

app.listen(3000, () => {
    console.log('App running on port 3000...');
});