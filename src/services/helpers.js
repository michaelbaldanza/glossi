function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function clipTags(str) {
  const re = /<[^>]*>/g
  const tagless = str.replace(re, '');
  return tagless;
}

export { capitalize, clipTags };