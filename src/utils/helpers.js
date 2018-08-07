/* eslint-disable no-confusing-arrow,no-nested-ternary */
import { reduce, map } from 'rambda';
import update from 'immutability-helper';

export const padStart = number => number.toString().padStart(2, '0');

export const firstLetterUpper = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;

export const camel2title = camelCase => camelCase
  .replace(/([A-Z])/g, match => ` ${match}`)
  .replace(/^./, match => match.toUpperCase());

export const filterByKey = (query = '', t = str => str) => (value) => {
  const blackList = ['id', '_id'];
  if (typeof value === 'string') {
    const formattedValue = value.includes(':') || value.includes('/') ? value : t(value);
    return formattedValue.toLowerCase().includes(query.toLowerCase());
  } else if (typeof value === 'number') {
    return value.toString().toLowerCase().includes(query.toLowerCase());
  } else if (Array.isArray(value)) {
    return value.filter(filterByKey(query, t)).length > 0;
  } else if (typeof value === 'object' && value !== null) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, val] of Object.entries(value)) {
      if (!blackList.includes(key) && filterByKey(query, t)(val)) {
        return true;
      }
    }
    return false;
  }
  return false;
};

export const chunk = (arr, chunkSize) => {
  const groups = [];
  let i;
  for (i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
};

export const compareValues = key => (a, b) => {
  if (typeof a[key] === 'undefined' || typeof b[key] === 'undefined') {
    return 0;
  }

  let varA = a[key];
  let varB = b[key];

  if (Number.isInteger(+varA) && Number.isInteger(+varB)) {
    varA = +varA;
    varB = +varB;
  }

  if (typeof varA === 'string') {
    varA = a[key].toUpperCase();
    varB = b[key].toUpperCase();
  }
  return varA > varB ? 1 : varA < varB ? -1 : 0;
};

export const notAuthorizedResolver = async (func) => {
  try {
    const response = await func();
    return response.data.data;
  } catch (err) {
    if (err.response && (err.response.status === 403 || err.response.status === 401)) {
      throw new Error('Not logged');
    }
    throw new Error(err);
  }
};

export const normalizator = reduce((acum, item) => ({ ...acum, [item._id]: item }), {});

export const idMapper = map(item => item._id);

export const getQueryVariable = (key) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === key) {
      return decodeURIComponent(pair[1]);
    }
  }
  return undefined;
};

export const downloadFile = (filename, blob) => {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const classNameJoiner = (...pieces) => pieces.filter(piece => piece).join(' ');

export const regularReducer = operation => (...keys) => (state, value) => update(state,
  keys.reduceRight((acum, key, index, array) => {
    if (index === array.length - 1) {
      return { [key]: { [operation]: value } };
    }
    return { [key]: { ...acum } };
  }, {}));

export const regularSetReducer = regularReducer('$set');
export const regularPushReducer = regularReducer('$push');
