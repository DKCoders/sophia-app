import update from 'immutability-helper';

export const initialState = {
  brands: {},
  editableBrand: null,
  fetched: false,
};

export const reducers = {
  updateBrands(state, brands = {}) {
    return update(state, {
      brands: { $merge: brands },
    });
  },
  setFetched(state, value) {
    return update(state, {
      fetched: { $set: value },
    });
  },
  updateEditableBrand(state, brand) {
    return update(state, {
      editableBrand: { $set: brand },
    });
  },
};
