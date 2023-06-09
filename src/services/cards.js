import { getToken } from './tokens';
import { makeOptions } from './constants';
const BASE_URL = '/api/cards/';

async function create(card) {
  console.log(`hitting create card services`)
  const options = makeOptions('POST', card);
  return await fetch(BASE_URL, options)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('bad credentials');
  });
}

export {
  create,
};