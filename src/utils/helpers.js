/* eslint-disable import/prefer-default-export */
export const filterByQuery = (query = '') => (value) => {
  const blackList = ['id', '_id'];
  if (typeof value === 'string') {
    return value.toLowerCase().includes(query.toLowerCase());
  } else if (typeof value === 'number') {
    return value.toString().toLowerCase().includes(query.toLowerCase());
  } else if (Array.isArray(value)) {
    return value.filter(filterByQuery(query)).length > 0;
  } else if (typeof value === 'object' && value !== null) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, val] of Object.entries(value)) {
      if (!blackList.includes(key) && filterByQuery(query)(val)) {
        return true;
      }
    }
    return false;
  }
  return false;
};
