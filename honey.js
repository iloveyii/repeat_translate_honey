function fillHives() {
    let count = 0;
    let max = 0;
    const lengthBiggestRow = (R * 2) - 1;

    for (let i = 0; i < lengthBiggestRow; i++) {
        const row = new Array();

        if (i >= R) {
            max--;
        } else {
            max = R + i;
        }
        for (let c = 0; c < (max); c++) {
            row.push(++count);
        }
        table.push(row);
    }
}

function findRowOfElement(el) {
    const lengthBiggestRow = (R * 2) - 1;

    for (let i = 0; i < lengthBiggestRow; i++) {
        if (i >= R) { // 3
            max--;
        } else {
            max = R + i;
        }
        for (let c = 0; c < (max); c++) {
            if (table[i][c] === el) {
                return [i, c];
            }
        }
    }
}

function findNeighbors(el) {
    const row = findRowOfElement(el);
    if (!Array.isArray(row) || row.length < 1) return [];
    const rowNumber = findRowOfElement(el)[0];
    const colNumber = findRowOfElement(el)[1];

    let uL, uR;

    if (rowNumber < R) {
        if (table[rowNumber - 1]) {
            uL = (table[rowNumber - 1][colNumber - 1]) ? table[rowNumber - 1][colNumber - 1] : null;
            uR = (table[rowNumber - 1][colNumber]) ? table[rowNumber - 1][colNumber] : null;
        }
    } else {
        uL = (table[rowNumber - 1][colNumber]) ? table[rowNumber - 1][colNumber] : null;
        uR = (table[rowNumber - 1][colNumber + 1]) ? table[rowNumber - 1][colNumber + 1] : null;
    }

    const left = (table[rowNumber][colNumber - 1]) ? table[rowNumber][colNumber - 1] : null;
    const right = (table[rowNumber][colNumber + 1]) ? table[rowNumber][colNumber + 1] : null;

    let dL, dR;
    if (rowNumber < R) {
        if (table[rowNumber + 1]) {
            dL = (table[rowNumber + 1][colNumber]) ? table[rowNumber + 1][colNumber] : null;
        }

        if (table[rowNumber + 1]) {
            dR = (table[rowNumber + 1][colNumber]) ? table[rowNumber + 1][colNumber + 1] : null;
        }
    } else {
        if (table[rowNumber + 1]) {
            dL = (table[rowNumber + 1][colNumber - 1]) ? table[rowNumber + 1][colNumber - 1] : null;
            dR = (table[rowNumber + 1][colNumber + 1]) ? table[rowNumber + 1][colNumber] : null;
        }
    }

    // 19
    if (rowNumber == (R - 1)) {
        if (table[rowNumber + 1]) {
            dL = (table[rowNumber + 1][colNumber - 1]) ? table[rowNumber + 1][colNumber - 1] : null;
        }

        if (table[rowNumber + 1]) {
            dR = (table[rowNumber + 1][colNumber]) ? table[rowNumber + 1][colNumber] : null;
        }
    }


    const neg = [
        uL, uR,
        left, right,
        dL, dR
    ];

    const filteredNeighbours = neg.filter(el => el != null);
    if (DEBUG) console.log('Neighbours of ' + el + ' :');
    return filteredNeighbours;
}

function findClosest2(counts, goal) {
    if (!Array.isArray(counts) || counts.length < 1) return null;
    const closest = counts.reduce(function (prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });

    return closest;
}

function findClosest(current, neighbours, target) {
    let colRow = findRowOfElement(target);
    const targetCol = colRow[0];
    const targetRow = colRow[1];
    if(DEBUG) console.log(colRow);

    let nearest = neighbours[0];
    let shortestDistance = 999999999;

    for(let i = 0; i < neighbours.length; i++) {
        let colRow = findRowOfElement(neighbours[i]);
        let neighbourCol = colRow[0];
        let neighbourRow = colRow[1];
        let colDistance = Math.abs(targetCol - neighbourCol);
        let rowDistance = Math.abs(targetRow - neighbourRow);
        let totalDistance = colDistance + rowDistance;
        if(totalDistance < shortestDistance) {
            shortestDistance = totalDistance;
            nearest = neighbours[i];
        } else if(totalDistance == shortestDistance) {
            if(potential.indexOf(neighbours[i]) !== -1) {
                nearest = neighbours[i];
            } else {
                potential.push(current);
                potential.push(neighbours[i]);
                potential = [...(new Set([potential]))];
            }
        }

    }

    return nearest;
}

function reachHoney(start, target, N, hardened) {
    // algorithm
    // find neighbours of start
    let neighbours = findNeighbors(start);
    if (DEBUG) console.log(neighbours);
    for (let i = 0; i < potential.length; i++) {
        const pot = potential[i];
        visited = visited.filter(item => item != pot);
    }
    // find closer to target, but avoid hardened
    // remove hardened from neighbours as well as visited
    const hardenedAndVisited = hardened.concat(visited);
    for (let i = 0; i < hardenedAndVisited.length; i++) {
        const hard = hardenedAndVisited[i];
        neighbours = neighbours.filter(item => item != hard);
    }
    const closest = findClosest(start, neighbours, target);
    if(closest == 47) {
        console.log('on the mark');
    }
    if (DEBUG) console.log('Closest to target ' + target + ' is : ' + closest);
    countN++;

    if (countN > N) {
        return -1;
    }
    if (closest === target) {
        return countN;
    }
    visited.push(closest);
    return reachHoney(closest, target, N, hardened);
}


function run(A, B, N, X) {
    fillHives();
    if (DEBUG) console.log(table);
    const reallyBig = 99999999;
    let find = 0;
    let min = reallyBig;

    // We try 10 times to get the shorted possible path
    while (find < 1) {
        countN = 0;
        if(DEBUG) {
            console.log('Iteration : ' + find + ', Visited :' + visited);
        }
        const result = reachHoney(A, B, N, X);
        if(DEBUG) {
            console.log('Nodes traversed: ' + result);
            console.log('Potential: ' + potential);
        }
        if (result > 0 && min > result) {
            min = result;
        }
        find++;
    }

    if (min === reallyBig) {
        return 'No';
    } else {
        return min;
    }
}


/** TEST DRIVE **/
const DEBUG = 1;

let countN = 0;
let visited = [];
let potential = [];
let table = new Array();

let R, N, A, B, X;
R = 6;
N = 653;
A = 44;
B = 28;
X = [15, 16, 17, 19, 26, 27, 52, 53, 58, 65, 74];

console.log(run(A, B, N, X));
