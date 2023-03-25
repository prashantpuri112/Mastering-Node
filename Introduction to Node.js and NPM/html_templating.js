const fs = require('fs')
const http = require('http');
const { dirname } = require('path');
const url = require('url')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data); // convert the data to a javascript object


const server = http.createServer((req, res) => {  // request, response
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    }
    else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    }
    else if (pathName === '/api') {

        res.writeHead(200, { 'content-type': 'application/json' }); // set the header to json
        res.end(data); // send the data to the client

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'  // custom header
        });
        res.end('<h1>Page not found!</h1>'); //We can also use html tags here
    }
});

server.listen(8000, '127.0.0.1', () => {   // port, ip address
    console.log('Listening to request on port 8000');
});
