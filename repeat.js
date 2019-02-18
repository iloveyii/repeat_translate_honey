const fs = require('fs');

const hasRepetition = (line) => {
    const arrayLine = line.split(' ');
    let repeating = false;

    for (let count = 0; count < arrayLine.length; count++) {
        const search = arrayLine[count];
        const arrayLine2 = arrayLine.slice();
        arrayLine2.splice(count, 1);
        repeating = repeating || arrayLine2.includes(search);
        if (repeating) {
            return repeating;
        }
    }

    return repeating;
};
;
const files = ['1.in', '2.in', '3.in'];
files.forEach(file => {
    try {
        var contents = fs.readFileSync(file, 'utf8');

        if (hasRepetition(contents) === true) {
            console.log('no')
        } else {
            console.log('yes');
        }
    } catch (e) {
        console.log('Error : ' + e.stack);
    }
});





