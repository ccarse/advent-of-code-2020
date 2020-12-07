import fs from 'fs';
import _ from 'lodash';

// This day sucked. This solution sucks. Idc. I'm done with this day.

const inputText = fs.readFileSync('./src/07/input.txt', 'utf-8').trim();
const rules = inputText.split('\n').map(rule => {
  const [container, contents] = rule.split(' bags contain ');
  return {
    container,
    contents
  };
});

const findContainingBags = (colors: Set<string>) => {
  let containingBags = new Set<string>(colors);
  for (const rule of rules) {
    if ([...colors].filter(color => rule.contents.includes(color)).length > 0) {
      containingBags.add(rule.container);
    };
  }
  if (!_.isEqual(colors, containingBags)) {
    containingBags = findContainingBags(containingBags);
  }
  return containingBags;
}


// Part 1
const answer = findContainingBags(new Set(['shiny gold']));
answer.delete('shiny gold');
console.log(`Part 1: ${answer.size}`);

// Part 2
const newRules = Object.fromEntries(inputText.split('\n').map(rule => {
  const [container, contents] = rule.split(' bags contain ');
  const ruleRules = contents === 'no other bags.' ? [] : contents.split(', ').map(c => {
    return [c.split(' ').slice(1, 3).join(' '), parseInt(c.split(' ')[0], 10)];
  });
  return [
    container,
    Object.fromEntries(ruleRules)
  ];
}));

const numBags: number[] = [];
const findBags = (color: string, multiplier: number) => {
  const containerBags = newRules[color];
  Object.entries(containerBags).forEach(([key, element]) => {
    numBags.push((element as number) * multiplier);
    // console.log(numBags);
    findBags(key, (element as number) * multiplier);
  });
}

findBags('shiny gold', 1);

console.log(`Part 2: ${numBags.reduce((a, b) => a + b, 0)}`);
