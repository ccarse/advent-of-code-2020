import fs from 'fs';

// Part 1
const input = fs.readFileSync('./src/01/input.txt', 'utf-8');
const inputCopy = `${input}`;
const ints = inputCopy.split('\n').map((x) => parseInt(x, 10));

let answer1: [number, number] | undefined;
for (let outer = 0; outer < ints.length; outer++) {
  const left = ints[outer] as number;
  for (let inner = outer + 1; inner < ints.length; inner++) {
    const right = ints[inner] as number;
    const sum = left + right;
    if (sum === 2020) {
      answer1 = [left, right];
      break;
    }
  }
  if (answer1) { break; }
}

console.log(`Part one: ${answer1![0] * answer1![1]}`);

let answer2: [number, number, number] | undefined;
for (let outer = 0; outer < ints.length; outer++) {
  const first = ints[outer] as number;
  for (let inner = outer + 1; inner < ints.length; inner++) {
    const second = ints[inner] as number;
    if (first + second > 2020) { continue; }
    for (let innerinner = inner + 1; innerinner < ints.length; innerinner++) {
      const third = ints[innerinner] as number;
      if ((first + second + third) === 2020) {
        answer2 = [first, second, third];
        break;
      }
    }
    if (answer2) { break; }
  }
  if (answer2) { break; }
}

console.log(`Part two: ${answer2![0] * answer2![1] * answer2![2]}`);


