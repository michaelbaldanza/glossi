import { getToken } from './tokens';

const BTN_CLASSES = 'btn btn-link link-dark toolbar-btn text-decoration-none';

const BYLINE_ITEM = 'byline-item';

function makeOptions(method, resource) {
  const options = {
    method: method,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
  };
  if (resource) options.body = JSON.stringify(resource);
  return options;
}

export { BTN_CLASSES, BYLINE_ITEM, makeOptions };