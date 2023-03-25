const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {  // request, response
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
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
