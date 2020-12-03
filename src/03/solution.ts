import fs from 'fs';

const treeCheck = (rowIncrement: number, columnIncrement: number) => {
  const inputText = fs.readFileSync('./src/03/input.txt', 'utf-8').trim();
  const lines = inputText.split('\n');

  let treeCount = 0;
  let columnIndex = 0;
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex += rowIncrement) {
    const line = lines[rowIndex];
    const treeChar = line[columnIndex % line.length];
    if (treeChar === '#') { treeCount++; }
    columnIndex += columnIncrement;
  }
  return treeCount;
}

// Part 1
console.log(`Part 1: ${treeCheck(1, 3)}`);

// Part 2
console.log(`Part 2: ${treeCheck(1, 1) * treeCheck(1, 3) * treeCheck(1, 5) * treeCheck(1, 7) * treeCheck(2, 1)}`);
