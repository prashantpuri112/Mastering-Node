const fs = require('fs');


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`), 'utf-8'); // read the file and store it in a variable

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length, // number of tours
        data: {
            tours
        }
    });
};

exports.getTour = (req, res) => {
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
};

exports.createTour = (req, res) => {  // POST request
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

}

exports.updateTour = (req, res) => { // PATCH request
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
}

exports.deleteTour = (req, res) => { // PATCH request
    if (req.params.id * 1 > tours.length) { // if the id is greater than the number of tours
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}
