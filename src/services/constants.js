import { getToken } from './tokens';

const BTN_CLASSES = 'btn btn-link link-dark toolbar-btn text-decoration-none';

const BYLINE_ITEM = 'byline-item';

async function fido(endpoint, options) {
  // try {
  //   const res = await fetch(endpoint, options);
  //   const data = await res.json();
  //   if (res.ok) {
  //     return data;
  //   }
  //   else {
  //     const err = new Error(`${res.status}: ${res.statusText}`);
  //     err.details = data;
  //     throw err;
  //   }
  // } catch (err) {
  //   throw err;
  // }
  try {
    const res = await fetch(endpoint, options);
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    else {
      // const err = new Error(`${res.status}: ${res.statusText}`);
      // err.details = data;
      // throw err;
      const err = new Error(data.message);
      err.details = data;
      err.name = data.name
      throw err;
    }
  } catch (err) {
    throw err;
  }
}

async function raiseErr(status, statusText, message) {
  console.log(`hitting raiseError`)
  const err = new Error(`${status}: ${statusText}`);
  err.details = message;
  console.log(message);
  return err;
}

function makeOptions(method, resource) {
  const token = getToken();
  const optionHeaders = new Headers({
    'Content-Type': 'application/json',
  });
  if (token) optionHeaders.set('Authorization', `Bearer ${token}`);
  const options = {
    method: method,
    headers: optionHeaders,
  };
  if (resource) options.body = JSON.stringify(resource);
  return options;
}

export { BTN_CLASSES, BYLINE_ITEM, fido, raiseErr, makeOptions, };