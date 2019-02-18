function translate(str) {
    const translations = new Map([
        ['a', '@'],
        ['b', '8'],
        ['c', '('],
        ['d', '|)'],
        ['e', '3'],
        ['f', '#'],
        ['g', '6'],
        ['h', '[-]'],
        ['i', '|'],
        ['j', '_|'],
        ['k', '|<'],
        ['l', '1'],
        ['m', '[]\\/[]'],
        ['n', '[]\\[]'],
        ['o', '0'],
        ['p', '|D'],
        ['q', '(,)'],
        ['r', '|Z'],
        ['s', '$'],
        ['t', "']['"],
        ['u', '|_|'],
        ['v', '\\/'],
        ['w', "\\/\\/"],
        ['x', '}{'],
        ['y', '`/'],
        ['z', '2']
    ]);
    str = str.toLowerCase();
    let translated = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (translations.has(char)) {
            translated += translations.get(char);
        } else {
            translated += char;
        }
    }

    return translated;
}

let str = "All your base are belong to us.";
console.log(translate(str));