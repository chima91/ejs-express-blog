const fs = require('fs');

fs.writeFile('./docs/test1.txt', 'hello, world', () => {
    console.log('file written');
})

fs.writeFile('./docs/test2.txt', 'hello, again', () => {
    console.log('file written');
})