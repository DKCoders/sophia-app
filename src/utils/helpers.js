/* eslint-disable no-nested-ternary,no-unused-vars */
import {
  reduce, map, join, compose, filter, path,
} from 'ramda';

export const padStart = number => number.toString().padStart(2, '0');

export const capitalize = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;

export const filterByQuery = (query = '', t = str => str) => (value) => {
  const blackList = ['id', '_id'];
  if (typeof value === 'string') {
    const formattedValue = value.includes(':') || value.includes('/') ? value : t(value);
    return formattedValue.toLowerCase().includes(query.toLowerCase());
  } if (typeof value === 'number') {
    return value.toString().toLowerCase().includes(query.toLowerCase());
  } if (Array.isArray(value)) {
    return value.filter(filterByQuery(query, t)).length > 0;
  } if (typeof value === 'object' && value !== null) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, val] of Object.entries(value)) {
      if (!blackList.includes(key) && filterByQuery(query, t)(val)) {
        return true;
      }
    }
    return false;
  }
  return false;
};

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


export const sortFn = (sortBy, sortOrder) => (a, b) => {
  if (typeof a[sortBy] === 'undefined' || typeof b[sortBy] === 'undefined') {
    return 0;
  }

  let varA = a[sortBy];
  let varB = b[sortBy];

  if (Number.isInteger(+varA) && Number.isInteger(+varB)) {
    varA = +varA;
    varB = +varB;
  }

  if (typeof varA === 'string') {
    varA = a[sortBy].toUpperCase();
    varB = b[sortBy].toUpperCase();
  }
  let comp = 0;
  comp = a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
  return sortOrder === 'asc' ? comp : comp * -1;
};


export const toDateString = dateString => (dateString ? (new Date(parseInt(dateString, 10))).toDateString() : '-');

export const validateRequired = val => val.length > 0;

export const debounce = (fn, interval) => {
  let timeout;
  return (...params) => {
    const functionCall = () => fn.apply(this, params);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, interval);
  };
};

export const fieldExtractor = (field, object) => {
  const fields = field.split('.');
  return path(fields, object);
};

export const mapValidationByType = compose(
  Object.entries,
  reduce((acum, [property, validations]) => {
    validations.forEach((validation) => {
      if (!acum[validation]) {
        // eslint-disable-next-line no-param-reassign
        acum[validation] = [];
      }
      acum[validation].push(property);
    });
    return acum;
  }, {}),
  Object.entries,
);

export const validations = {
  required: str => !!str,
};

export const validationsMessages = {
  required: 'Field required',
};

export const formatFromTo = (from, to) => {
  const fromFormat = `${from.substr(0, 2)}:${from.substr(2)}`;
  const toFormat = `${to.substr(0, 2)}:${to.substr(2)}`;
  return `${fromFormat} - ${toFormat}`;
};

const entriesJoiner = compose(
  join('&'),
  map(([key, value]) => `${key}=${value}`),
  filter(([key, value]) => value !== undefined),
);

export const objectToQueryParams = (params = {}) => {
  const entries = Object.entries(params);
  if (!entries.length) {
    return '';
  }
  return `?${entriesJoiner(entries)}`;
};

// propertyExtractor(obj, [paths])
export const propertyExtractor = reduce((acum, _path) => acum[_path]);
