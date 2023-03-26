const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => { // utf-8 is the encoding type
    console.log(`Breed: ${data}`);

    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`) // https://dog.ceo/dog-api/
        .then(res => { // res is the response object
            console.log(res.body.message); // res.body is the body of the response object

            fs.writeFile('dog-img.txt', res.body.message, err => { // fs.writeFile is asynchronous
                if (err) return console.log(err.message);
                console.log('Random dog image saved to file!');
            });
        }).catch(err => {
            console.log(err.message);
        });
});