const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => { // readFilePro is a function that returns a promise
    return new Promise((resolve, reject) => { // Promise is a constructor function
        fs.readFile(file, (err, data) => { // fs.readFile is asynchronous
            if (err) reject('I could not find that file 😢'); // reject is a function that is called when the promise is rejected
            resolve(data); // resolve is a function that is called when the promise is fulfilled        
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write the file 😢');
            resolve('success');
        });
    });
}


readFilePro(`${__dirname}/dog.txt`).then(data => { // readFilePro is a function that returns a promise
    console.log(`Breed: ${data}`);

    return superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res => { // res is the response object
    console.log(res.body.message); // res.body is the body of the response object
    return writeFilePro('dog-img.txt', res.body.message);
}).then(() => {
    console.log('Random dog image saved to file!');
})
    .catch(err => {
        console.log(err);
    });