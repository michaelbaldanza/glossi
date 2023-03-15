export const lexica = {
  'fd': {
    'name': 'Free Dictionary',
    'link': 'https://dictionaryapi.dev/',
    'endpoint': function(term) {
      return 'https://api.dictionaryapi.dev/api/v2/entries/en/' + term;
    },
    'compose': async function(term) {
      const data = await get(this.endpoint(term));
      return data;
    },
  },
};

async function get(term) {
  if (Array.isArray(term)) {
    const data = await fetch(...term)
    .then((res) => res.json()
    .then((data) => {
      return data;
    }));
    return data;
  } else {
    const data = await fetch(term)
    .then((res) => res.json()
    .then((data) => {
      return data;
    }));
    return data;
  }
}