import { getToken } from './tokens';
const BASE_URL = '/api/scrolls/'

async function create(scroll) {
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
    body: JSON.stringify(scroll),
  };
  return await fetch(BASE_URL + 'save', options)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('bad credentials');
  });
}

async function deleteScroll(scrollId) {
  const options = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
  }
  await fetch(BASE_URL + scrollId + '/delete', options);
  return true;
}

async function index() {
  return await fetch(BASE_URL).then(res => res.json());
}

async function getScroll(scrollId) {
  return await fetch(BASE_URL + scrollId).then(res => res.json());
}

async function update(scrollId, updates) {
  const options = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
    body: JSON.stringify(updates)
  };
  return await fetch(BASE_URL + scrollId, options).then(res => res.json());
}

export {
  create,
  deleteScroll,
  getScroll,
  index,
  update,
};