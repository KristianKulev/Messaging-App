import { PROJECT_NAME_ABBR } from '../utils/constants';

const STORAGE_PREFIX = `${PROJECT_NAME_ABBR}_`;

// storageService = {
//   set,
//   get,
//   rem,  // `remove`
//   exists,
// };

const set = (type, key, value) => {
  const storageType = type === 'local' ? 'localStorage' : 'sessionStorage';
  key = key.toLowerCase();

  window[storageType].setItem(STORAGE_PREFIX + key, JSON.stringify(value));
};

const get = (type, key) => {
  const storageType = type === 'local' ? 'localStorage' : 'sessionStorage';
  key = key.toLowerCase();

  const val = JSON.parse(window[storageType].getItem(STORAGE_PREFIX + key));

  return val;
};

const rem = (type, key) => {
  const storageType = type === 'local' ? 'localStorage' : 'sessionStorage';
  key = key.toLowerCase();

  window[storageType].removeItem(STORAGE_PREFIX + key);
};

const exists = (type, key) => {

  key = key.toLowerCase();

  return !!get(type, key);
};

export default {
  set,
  get,
  rem,  // `remove`
  exists,
};
