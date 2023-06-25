const BASE_URL = '/api/definitions/';

async function get(defId) {
  return await fetch(BASE_URL + defId).then(res => res.json());
}

export {
  get,
};