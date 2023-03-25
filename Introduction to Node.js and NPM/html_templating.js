const fs = require('fs')
const http = require('http');
const { dirname } = require('path');
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')

//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, `utf-8`);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, `utf-8`);
const tempProduct = fs.readFileSync(`${__dirname}/templates/templete-product.html`, `utf-8`);


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data); // convert the data to a javascript object


const server = http.createServer((req, res) => {  // request, response

    const { query, pathname } = url.parse(req.url, true) // parse the url to an object


    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(''); // join the array to a string
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        //Product page
    }
    else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    //API
    else if (pathname === '/api') {

        res.writeHead(200, { 'content-type': 'application/json' }); // set the header to json
        res.end(data); // send the data to the client

        //Not found

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
