const fs = require('fs')

// //Blocking , Synchronous way

// //Reading Files
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); // not specifing utf-8 might get back a buffer

// console.log(textIn);

// // Writing Files

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-Blocking, Asynchronous way

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('ERROR!');

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, err => {
                console.log(`Your file has been written`);

            });
        });
    });
});
console.log('will read file!');