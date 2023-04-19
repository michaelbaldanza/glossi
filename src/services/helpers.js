function breakLines(str) {
  return str.split(/\r?\n|\r|\n/g);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function clipTags(str) {
  const re = /<[^>]*>/g;
  return str.replace(re, '');
}

function depunctuate(str) {
  const re = /[,.?!()/":;—']/g;
  return str.replace(re, '')
}

function isLast(idx, arr) {
  const last = (arr.length - 1) === idx ? true : false;
  return last;
}



export { breakLines, capitalize, clipTags, depunctuate, isLast };