function breakLines(str) {
  return str.split(/\r?\n|\r|\n/g);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function clipColon(str) {
  const re = /\:.*/;
  return str.replace(re, '');
}

function clipNums(str) {
  const re = /[1234567890]/g;
  return str.replace(re, '');
}

function clipTags(str) {
  const re = /<[^>]*>/g;
  return str.replace(re, '');
}

function depunctuate(str) {
  const re = /[,.?!()/"”“:;—']/g;
  return str.replace(re, '')
}

function escape(char) {
  const escs = {
    ' ': true,
    '/': true,
  };

  return escs[char];
}

function isLast(idx, arr) {
  const last = (arr.length - 1) === idx ? true : false;
  return last;
}

function swapMacron(str) {
  const macra = {
    'ā': 'a',
    'ē': 'e',
    'ī': 'i',
    'ō': 'o',
    'ū': 'u',
  };
  const letters = str.split('');
  const newLetters = [];
  for (let i = 0; i < letters.length; i++) {
    if (macra[letters[i]]) {
      newLetters.push(macra[letters[i]]);
    } else {
      newLetters.push(letters[i]);
    }
  }
  return newLetters.join('');
}

function varToString(varObj) {
  return Object.keys(varObj)[0];
}

export {
  breakLines, capitalize, clipColon, clipNums, clipTags, depunctuate, escape,
  isLast, swapMacron, varToString,
};