import { fido, makeOptions } from './constants';
const BASE_URL = '/api/decks/';

async function deleteDeck(deckId) {
  const options = makeOptions('DELETE');
  await fetch(BASE_URL + deckId, options);
  return true;
}

async function edit(deckId) {
  const options = makeOptions('GET');
  return await fido(BASE_URL + deckId + '/edit', options);
}

async function get(deckId) {
  const options = makeOptions('GET');
  return await fido(BASE_URL + deckId, options);
  return await fetch(BASE_URL + deckId).then(res => {
    console.log(`fetching decks`)
    if (res.ok) {
      console.log(`res ok`)
      return res.json();
    } else {
      console.log(`res NOT ok`)
      return res.json().then(error => {
        throw { res, error };
      });
    }
  });
}

async function index() {
  const options = makeOptions('GET');
  return await fido(BASE_URL, options);
}

async function update(deckId, updates) {
  const options = makeOptions('PUT', updates);
  return await fido(BASE_URL + deckId, options);
}

export {
  deleteDeck,
  edit,
  get,
  index,
  update,
};