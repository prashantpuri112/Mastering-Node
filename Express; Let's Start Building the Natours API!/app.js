const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) MIDDLEWARE
app.use(morgan('tiny')); // middleware to log the requests in the console
app.use(express.json()); // middleware to parse the body of the request

app.use(express.static(`${__dirname}/public`)); // middleware to serve static files (html, css, js, etc.

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// 3) ROUTES

app.use('/api/v1/tours', tourRouter); // mount the router on a route
app.use('/api/v1/users', userRouter);

// 4) START SERVER

module.exports = app;