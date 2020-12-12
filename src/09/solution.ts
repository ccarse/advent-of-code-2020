import fs from 'fs';

const inputText = fs.readFileSync('./src/09/input.txt', 'utf-8').trim();
const nums = inputText.split('\n').map(l => parseInt(l, 10));

const isSumOfNumbers = (n: number, l: number[]): boolean => {
  // console.log(`Checking that ${n} is a sum of two of: ${l}`)
  for (const k of l) {
    if (l.includes(n - k)) {
      // console.log(`${n} is a sum of two of: ${k} and ${n - k}`)
      return true;
    }
  }
  return false;
}
// Part 1
for (let index = 25; index < nums.length; index++) {
  const num = nums[index];
  if (!isSumOfNumbers(num, nums.slice(index - 25, index))) {
    console.log(`Part 1: ${num}`);
  }
}

// Part 2
const invalidNum = 22406676;

const findContig = (index: number, arr: number[], toEqual: number): false | number[] => {
  const startingIndex = index;
  let runningSum = 0;
  while (runningSum < toEqual) {
    runningSum += arr[index];
    index += 1;
    if (runningSum === toEqual) {
      console.log(`Index: ${index} runningSum: ${runningSum} answer: ${arr.slice(startingIndex, index)}`);
      return arr.slice(startingIndex, index);
    }
  }
  return false;
}

for (let i = 0; i < nums.length; i++) {
  const answer = findContig(i, nums, invalidNum);
  if (answer) {
    const smallest = Math.min(...answer);
    const largest = Math.max(...answer);
    console.log(`Part 2: ${smallest + largest}`);
    break;
  }
}

// console.log(`Part 2: ${lines}`);
