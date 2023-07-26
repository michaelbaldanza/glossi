import { makeOptions } from './constants';
const BASE_URL = '/api/scrolls/'

async function create(scroll) {
  const options = makeOptions('POST', scroll);
  return await fetch(BASE_URL, options)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('bad credentials');
  });
}

async function deleteScroll(scrollId) {
  const options = makeOptions('DELETE');
  await fetch(BASE_URL + scrollId + '/delete', options);
  return true;
}

async function index() {
  return await fetch(BASE_URL).then(res => res.json());
}

async function get(scrollId) {
  return await fetch(BASE_URL + scrollId).then(res => res.json());
}

async function update(scrollId, updates) {
  const options = makeOptions('PUT', updates);
  return await fetch(BASE_URL + scrollId, options).then(res => res.json());
}

export {
  create,
  deleteScroll,
  get,
  index,
  update,
};