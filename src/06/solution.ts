import fs from 'fs';
import _ from 'lodash'; 

// Part 1
const groups = fs.readFileSync('./src/06/input.txt', 'utf-8').split('\n\n');
console.log(`Part 1: ${groups.map(group => new Set(group.split("\n").join("")).size ).reduce((a, b) => a + b, 0)}`);

// Part 2
const sums = groups.map(group => {
  const answers = group.split("\n").map(a => a.split(""));
  return _.intersection(...answers).length;
});

console.log(`Part 1: ${sums.reduce((a, b) => a + b, 0)}`);
