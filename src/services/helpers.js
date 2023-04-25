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
  const re = /[,.?!()/":;—']/g;
  return str.replace(re, '')
}

function isLast(idx, arr) {
  const last = (arr.length - 1) === idx ? true : false;
  return last;
}



export { breakLines, capitalize, clipColon, clipNums, clipTags, depunctuate, isLast };