import { getToken } from './tokens';
const BASE_URL = '/api/decks/';

async function get(deckId) {
  return await fetch(BASE_URL + deckId).then(res => res.json());
}

async function index() {
  return await fetch(BASE_URL).then(res => res.json());
}

export {
  get,
  index,
};