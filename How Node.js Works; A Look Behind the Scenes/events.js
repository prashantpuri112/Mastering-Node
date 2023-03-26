const EventEmitter = require('events');
const http = require('http');
const myEmitter = new EventEmitter(); // Create an instance of EventEmitter

class Sales extends EventEmitter { // Create a class that extends EventEmitter
    constructor() { // Create a constructor
        super(); // Call the constructor of the parent class
    }
}

myEmitter.on("newSale", () => { // Listen to the event
    console.log("There was a new sale!");
});

myEmitter.on("newSale", () => { // Listen to the event
    console.log("Customer name: Prashant");
});

myEmitter.on("newSale", stock => { // Listen to the event
    console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9); // Emit an event

///////////////////////////

const server = http.createServer(); // Create a server

server.on("request", (req, res) => { // Listen to the request event
    console.log("Request received!");
    console.log(req.url); // Log the url
    res.end("Request received");
});

server.on("request", (req, res) => { // Listen to the request event
    console.log("Another request");
});

server.on("close", () => { // Listen to the close event
    console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => { // Listen to the port
    console.log("Waiting for requests...");
});