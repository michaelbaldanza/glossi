function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function depunctuate(str) {
  const re = /[,.?!()/":;—']/g;
  return str.replace(re, '')
}


function clipTags(str) {
  const re = /<[^>]*>/g;
  return str.replace(re, '');
}

function breakLines(str) {
  return str.split(/\r?\n|\r|\n/g);
}



export { breakLines, capitalize, clipTags, depunctuate };