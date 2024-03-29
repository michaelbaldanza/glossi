import { getUserFromToken, getToken, removeToken, setToken } from './tokens';

const BASE_URL = '/api/users/';

function get() { // gets the logged in user
  return getUserFromToken();
}

async function getUserById(id) {
  return await fetch(BASE_URL + 'id/' + id).then(res => res.json());
}

async function getByUsername(username) {
  return await fetch(BASE_URL + username).then(res => res.json());
}

async function getUserDecksAndScrolls() {
  const options = {
    method: 'GET',
    headers: new Headers({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
  };
  return await fetch(BASE_URL + 'profile', options).then(res => res.json());
}

async function login(creds) {
  const options = {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds),
  };
  return fetch(BASE_URL + 'login', options)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('bad credentials');
  })
  .then(({token}) => {
    setToken(token);
  })
}

function logout() {
  removeToken();
}

async function signup(user) {
  const options = {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user),
  };
  return fetch(BASE_URL + 'signup', options)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error');
  })
  .then (({token}) => {
    setToken(token);
  })
}

export {
  get,
  getUserById,
  getByUsername,
  getUserDecksAndScrolls,
  login,
  logout,
  signup,
};