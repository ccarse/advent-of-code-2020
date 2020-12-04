import fs from 'fs';

const inputText = fs.readFileSync('./src/04/input.txt', 'utf-8').trim();
const passports = inputText.split('\n\n');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let validCount = 0;
for (const passport of passports) {
  const fields = passport.split(/\s+/).map(p => p.split(':')[0]);
  if (requiredFields.every(v => fields.includes(v))) { validCount++; }
}

// Part 1
console.log(`Part 1: ${validCount}`);


// Part 2
const hexdigits = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']);
const eyecolors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

const validArray = passports.filter(passportTxt => {
  const fields = passportTxt.split(/\s+/);

  const passport = Object.fromEntries(fields.map(field => field.split(':')));
  // console.log(passport);
  const byrInt = parseInt(passport.byr, 10);
  if (!(byrInt >= 1920 && byrInt <= 2002)) { return false; }

  const iyrInt = parseInt(passport.iyr, 10);
  if (!(iyrInt >= 2010 && iyrInt <= 2020)) { return false; }

  const eyrInt = parseInt(passport.eyr, 10);
  if (!(eyrInt >= 2020 && eyrInt <= 2030)) { return false; }

  const height = passport.hgt && passport.hgt.slice(0, -2);
  const unit = passport.hgt && passport.hgt.slice(-2);
  if (!(unit === 'cm' && (height >= 150 && height <= 193) ||
    unit === 'in' && (height >= 59 && height <= 76))) {
    return false;
  }

  const hcl = passport.hcl;
  if (!hcl || !(hcl.slice(0, 1) === '#' && hcl.slice(1).length === 6 && hcl.slice(1).split('').every((c: string) => hexdigits.has(c)))) { return false; }

  const ecl = passport.ecl;
  if (!(eyecolors.has(ecl))) { return false; }

  const pid = passport.pid;
  if (!(/^\d+$/.test(pid) && pid.length === 9)) { return false; }

  return true;
});

console.log(`Part 2: ${validArray.length}`);
