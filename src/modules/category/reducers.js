import {
  regularSetByIdReducer,
  regularMergeReducer,
  regularUnsetReducer,
  regularSetReducer,
} from '../../utils/reducerHelpers';

export const initialState = {
  categories: {},
  editableCategory: null,
  fetched: false,
};

export const reducers = {
  updateCategories: regularMergeReducer('categories'),
  updateCategory: regularSetByIdReducer('categories'),
  deleteCategory: regularUnsetReducer('categories'),
  setFetched: regularSetReducer('fetched'),
  updateEditableCategory: regularSetReducer('editableCategory'),
};
