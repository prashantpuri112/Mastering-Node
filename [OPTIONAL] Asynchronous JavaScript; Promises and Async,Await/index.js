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
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file!');
    } catch (err) {
        console.log(err);
        throw err;
    }
    return '2: READY';
};

(async () => {
    try {
        console.log('1: Will get dog pics!');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pics!');
    } catch (err) {
        console.log('ERROR 💥');
    }
})();



/*
console.log('1: Will get dog pics!');
getDogPic()
    .then(x => {
        console.log(x);
        console.log('3: Done getting dog pics!');
    }).catch(err => {
        console.log('ERROR 💥');
    });
*/

/*

readFilePro(`${ __dirname } / dog.txt`).then(data => { // readFilePro is a function that returns a promise
    console.log(`Breed: ${ data }`);

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

*/