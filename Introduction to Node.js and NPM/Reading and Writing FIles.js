const fs = require('fs')

//Reading Files
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); // not specifing utf-8 might get back a buffer

console.log(textIn);

//Writing Files

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');