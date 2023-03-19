import { getUserFromToken, removeToken, setToken } from './tokens';

const BASE_URL = '/api/users/';

function getUser() {
  return getUserFromToken();
}

function logout() {
  removeToken();
}

async function signup(user) {
  console.log(`hitting services/users signup`);
  console.log(user);
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user),
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error');
  })
  .then (({token}) => setToken(token));
}

export {
  getUser,
  logout,
  signup,
}