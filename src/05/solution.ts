import fs from 'fs';

const inputText = fs.readFileSync('./src/05/input.txt', 'utf-8').trim();
const seats = inputText.split('\n');

// Part 1
const seatIds = seats.map(seat => {
    const rowCode = seat.slice(0, 7);
    const columnCode = seat.slice(-3);
    let row = 0;
    for (let i = 7; i > 0; i--) {
        const range = 2 ** i;
        const c = rowCode.slice(-1 * i)[0];

        if(c === "B") { row += (range / 2); }
    }

    let column = 0;
    for (let i = 3; i > 0; i--) {
        const range = 2 ** i;
        const c = columnCode.slice(-1 * i)[0];

        if(c === "R") { column += (range / 2); }
    }
    const seatId = (row * 8) + column;
    return seatId;
});

console.log(`Part 1: ${Math.max(...seatIds)}`);

// Part 2
for (let i = Math.min(...seatIds); i <= Math.max(...seatIds); i++) {
    if(!seatIds.includes(i)) { console.log(`Part 2: Seat ${i} not found!`); }
}



