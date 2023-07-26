import { makeOptions } from './constants';
const BASE_URL = '/api/decks/';

async function deleteDeck(deckId) {
  const options = makeOptions('DELETE');
  await fetch(BASE_URL + deckId + '/delete', options);
  return true;
}

async function get(deckId) {
  return await fetch(BASE_URL + deckId).then(res => res.json());
}

async function index() {
  return await fetch(BASE_URL).then(res => res.json());
}

async function update(deckId, updates) {
  const options = makeOptions('PUT', updates);
  return await fetch(BASE_URL + deckId, options);
}

export {
  deleteDeck,
  get,
  index,
  update,
};