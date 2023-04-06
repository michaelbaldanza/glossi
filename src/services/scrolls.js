import { getToken } from './tokens';
const BASE_URL = '/api/scrolls/'

function create(scroll) {
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
    body: JSON.stringify(scroll),
  };
  return fetch(BASE_URL + 'save', options)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('bad credentials');
  });
}

async function getScroll(scrollId) {
  console.log(scrollId);
  console.log(`awaiting fetch`)
  return await fetch(BASE_URL + scrollId).then(res => res.json());
}

export {
  create,
  getScroll,
};