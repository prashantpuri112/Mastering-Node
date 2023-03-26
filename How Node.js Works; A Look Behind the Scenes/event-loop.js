const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4; // This will set the number of threads in the thread pool to 4

setTimeout(() => console.log("Timeout 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile('text-file.txt', () => {
    console.log("I/O finished");
    console.log("----------------");

    setTimeout(() => console.log("Timeout 2 finished"), 0);
    setTimeout(() => console.log("Timeout 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick")); // This will be executed before the next line of code

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

});

console.log("Hello from the top-level code");
