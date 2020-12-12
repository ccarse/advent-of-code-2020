import fs from 'fs';

let inputText = fs.readFileSync('./src/08/input.txt', 'utf-8').trim();
let instructions = inputText.split('\n');

const runPartOne = () => {
  let accumulator = 0;
  let pointer = 0;
  const instructionsRan: number[] = [];

  while (!instructionsRan.includes(pointer)) {
    instructionsRan.push(pointer);
    const [operation, argument] = instructions[pointer].split(' ');
    const sign = argument.slice(0, 1);
    const amount = parseInt(argument.slice(1), 10);
    let multiplier = 1;

    if (sign === '-') { multiplier = -1; }

    switch (operation) {
      case 'acc':
        accumulator += (multiplier * amount);
        pointer += 1;
        continue;
      case 'jmp':
        pointer += (multiplier * amount)
        continue;
      case 'nop':
        pointer += 1;
        break;
      default:
        break;
    }
  }
  return accumulator;
}

// Part 1
console.log(`Part 1: ${runPartOne()}`);

// Part 2
const runProgram = (input: string[]) => {
  let accumulator = 0;
  let pointer = 0;
  const instructionsRan: number[] = [];

  while (true) {
    if (pointer === input.length) { return accumulator; }
    if (instructionsRan.includes(pointer)) { return null; }

    instructionsRan.push(pointer);
    const [operation, argument] = instructions[pointer].split(' ');
    const sign = argument.slice(0, 1);
    const amount = parseInt(argument.slice(1), 10);
    let multiplier = 1;
    if (sign === '-') { multiplier = -1; }

    switch (operation) {
      case 'acc':
        accumulator += (multiplier * amount);
        pointer += 1;
        continue;
      case 'jmp':
        pointer += (multiplier * amount)
        continue;
      case 'nop':
        pointer += 1;
        continue;
      default:
        break;
    }
  }
}

const possibleProblems: number[] = [];
for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  if (['jmp', 'nop'].includes(instruction.slice(0, 3))) {
    possibleProblems.push(i);
  }
}

for (const problem of possibleProblems) {
  inputText = fs.readFileSync('./src/08/input.txt', 'utf-8').trim();
  instructions = inputText.split('\n');
  const problemInstruction = instructions[problem];
  if (problemInstruction.slice(0, 3) === 'jmp') { instructions[problem] = 'nop' + problemInstruction.slice(3); }
  if (problemInstruction.slice(0, 3) === 'nop') { instructions[problem] = 'jmp' + problemInstruction.slice(3); }
  const result = runProgram(instructions);
  if (result) {
    console.log(`Part 2: ${result}`);
  }
}

