export const lexica = {
  'fd': {
    'name': 'Free Dictionary',
    'link': 'https://dictionaryapi.dev/',
    'args': function(term) {
      return 'https://api.dictionaryapi.dev/api/v2/entries/en/' + term;
    },
  },
  'wikt': {
    'name': 'Wiktionary',
    'link': 'https://en.wiktionary.org/api/rest_v1/#/',
    'args': function(term) {
      const path = 'https://en.wiktionary.org/api/rest_v1/page/definition/' + term;
      const ro = { // request object
        method: 'GET',  
        headers: {
            'accept': 'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/definition/0.8.0"',
            'User-Agent': process.env.EMAIL,
          }
      };
      return [path, ro];
    },
  }
};

export async function get(term) {
  try {
    const data = Array.isArray(term) ?
      await fetch(...term) : await fetch(term)
    ;
    return data.json();
  } catch (error) {
    console.error(error);
    return `error`;
  }
}