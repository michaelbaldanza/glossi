import { fido, makeOptions } from './constants';
const BASE_URL = '/api/scrolls/'
const API = '/api';

async function create(scroll) {
  const options = makeOptions('POST', scroll);
  return await fido(BASE_URL, options);
}

async function deleteScroll(scrollId) {
  console.log(`hitting deleteScroll`)
  const options = makeOptions('DELETE');
  return await fido(BASE_URL + scrollId, options);
}

async function edit(scrollId) {
  const options = makeOptions('GET');
  return await fido(BASE_URL + scrollId + '/edit', options);
}

async function index(queryString) {
  const options = makeOptions('GET');
  return await fido(BASE_URL + queryString, options);
}

async function get(scrollId, path) {
  const options = makeOptions('GET');
  return await fido(BASE_URL + scrollId, options);
}

async function newScroll() {
  const options = makeOptions('GET');
  return await fido(BASE_URL + 'new', options)
}

async function update(scrollId, updates) {
  const options = makeOptions('PUT', updates);
  return await fido(BASE_URL + scrollId, options);
}

export {
  create,
  deleteScroll,
  edit,
  get,
  index,
  newScroll,
  update,
};