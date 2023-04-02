const express = require('express'); // import express
const tourController = require('./../controllers/tourController'); // import the tour controller

const router = express.Router(); // create a new router

router.param('id', tourController.checkID); // middleware to check if the id is a number

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack



router
    .route('/') // chaining the routes
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router; // export the router