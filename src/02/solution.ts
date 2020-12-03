import fs from 'fs';
const input = fs.readFileSync('./src/02/input.txt', 'utf-8');

const inputCopy = `${input}`;
const lines = inputCopy.split('\n');

let validCount = 0;
for (const line of lines) {
  const parts = line.split(':');
  const policy = parts[0];
  const password = parts[1].trim();
  const policyParts = policy.split(' ');
  const policyOccurencesParts = policyParts[0].split('-');
  const policyMinOccurence = parseInt(policyOccurencesParts[0], 10);
  const policyMaxOccurence = parseInt(policyOccurencesParts[1], 10);
  const policyChar = policyParts[1];
  const numOccurences = password.split(policyChar).length - 1;
  if (numOccurences >= policyMinOccurence && numOccurences <= policyMaxOccurence) {
    validCount++;
  }
}

console.log(`Part 1: ${validCount}`);

validCount = 0;
for (const line of lines) {
  const parts = line.split(':');
  const policy = parts[0];
  const password = parts[1].trim();
  const policyParts = policy.split(' ');
  const policyOccurencesParts = policyParts[0].split('-');
  const policyFirstIndex = parseInt(policyOccurencesParts[0], 10);
  const policySecondIndex = parseInt(policyOccurencesParts[1], 10);
  const policyChar = policyParts[1];
  const subPassword = password[policyFirstIndex - 1] + password[policySecondIndex - 1];
  const numOccurences = subPassword.split(policyChar).length - 1;
  if (numOccurences === 1) {
    validCount++;
  }
}

console.log(`Part 2: ${validCount}`);