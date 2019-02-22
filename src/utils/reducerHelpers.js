import { omit } from 'ramda';
import update from 'immutability-helper';
import { propertyExtractor } from './helpers';

export const keyReduceFunction = (operation, value) => (acum, key, index, array) => {
  if (index === array.length - 1) {
    return { [key]: { [operation]: value } };
  }
  return { [key]: { ...acum } };
};

export const reducerMaker = defaultValue => operation => (...keys) => (state, _value) => {
  const value = _value !== undefined ? _value : defaultValue;
  return update(state, keys.reduceRight(keyReduceFunction(operation, value), {}));
};

export const regularReducer = reducerMaker();

export const regularSetReducer = regularReducer('$set');
export const regularUnsetReducer = regularReducer('$unset');
export const regularMergeReducer = regularReducer('$merge');
export const regularPushReducer = regularReducer('$push');

export const spliceReducer = (...keys) => (state, index) => update(state, keys.reduceRight(keyReduceFunction('$splice', [[index, 1]]), {}));

export const regularSetByIdReducer = (...keys) => (state, item) => update(
  state,
  keys.reduceRight(keyReduceFunction(item._id, { $set: item }), {}),
);

export const arrayDefaultReducer = reducerMaker([]);
export const arraySetReducer = arrayDefaultReducer('$set');

export const omitReducer = (...keys) => (state, id) => {
  const item = propertyExtractor(state, keys);
  return update(state, keys.reduceRight(keyReduceFunction('$set', omit([id], item)), {}));
};
