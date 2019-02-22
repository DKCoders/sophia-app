import {
  regularSetByIdReducer,
  regularMergeReducer,
  regularUnsetReducer,
  regularSetReducer,
} from '../../utils/reducerHelpers';

export const initialState = {
  brands: {},
  editableBrand: null,
  fetched: false,
};

export const reducers = {
  updateBrands: regularMergeReducer('brands'),
  updateBrand: regularSetByIdReducer('brands'),
  deleteBrand: regularUnsetReducer('brands'),
  setFetched: regularSetReducer('fetched'),
  updateEditableBrand: regularSetReducer('editableBrand'),
};
