import { isMobile } from 'react-device-detect';

export const refOrder = isMobile ? ['fd', 'mw'] : ['wikt', 'fd', 'mw',];
// removed 'odus' from refOrder for development
// normal refOrder is 'wikt', ... 'odus

export const lexica = {
  'fd': {
    'name': 'Free Dictionary',
    'link': 'https://dictionaryapi.dev/',
    'args': function(term) {
      const endpoint = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + term; 
      return endpoint;
    },
  },
  'mw': {
    'name': `Merriam-Webster's`,
    'link': 'https://dictionaryapi.com/products/json',
    'args': function(term) {
      const endpoint = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' +
        term + '?key=' + process.env.REACT_APP_MW_DICTIONARY;
      return endpoint;
    },
  },
  'odus': {
    'name': 'Oxford Dictionary',
    'link': 'https://developer.oxforddictionaries.com/documentation/languages',
    'args': function (term) {
      const endpoint = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + term;
      const ro = { // request object
        method: 'GET',
        headers: {'app_id': process.env.OXFORD_ID, 'app_key': process.env.OXFORD_KEY}
      };
      return [endpoint, ro];      
    },
  },
  'wikt': {
    'name': 'Wiktionary',
    'link': 'https://en.wiktionary.org/api/rest_v1/#/',
    'args': function(term) {
      const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition/' + term;
      const ro = { // request object
        method: 'GET',  
        headers: {
            'accept': 'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/definition/0.8.0"',
            'User-Agent': process.env.REACT_APP_EMAIL,
          },
      };
      return [endpoint, ro];
    },
  },
};

export async function get(args) {
  try {
    const data = Array.isArray(args) ?
      await fetch(...args) : await fetch(args)
    ;
    return data.json();
  } catch (error) {
    return `error`;
  }
}

export async function collect(term) {
  const responses = {};
  for (let i = 0; i < refOrder.length; i++) {
    let ref = refOrder[i];
    if (ref === 'wikt' && isMobile) return;
    let response = await get(lexica[ref].args(term));
    if (
      ref === 'wikt' && response &&
      response.detail
      ) {
      response = await get(lexica[ref].args(term.toLowerCase()));
    }
    responses[ref] = {
      'name': lexica[ref].name,
      'abbr': ref,
      'response': response,
    };
  }
  return responses;
}