import { getUserFromToken, removeToken, setToken } from './tokens';

const BASE_URL = '/api/users/';

function getUser() {
  return getUserFromToken();
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
  getUser,
  login,
  logout,
  signup,
}