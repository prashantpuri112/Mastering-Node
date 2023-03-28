const express = require('express');

const app = express();

app.get('/', (req, res) => { // req = request, res = response
    res.status(200)
        .json({ message: 'Hello from the server side!', app: 'Natours' }); // status code 200 = OK
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
});

const port = 3000;

app.listen(3000, () => {
    console.log('App running on port 3000...');
});