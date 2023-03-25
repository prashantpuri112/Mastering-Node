const fs = require('fs')
const http = require('http')

// SERVER

const server = http.createServer((req, res) => {  // request, response
    console.log(req);
    res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {   // port, ip address
    console.log('Listening to request on port 8000');
});
