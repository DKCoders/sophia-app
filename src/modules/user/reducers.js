import {
  regularSetByIdReducer,
  regularMergeReducer,
  regularUnsetReducer,
  regularSetReducer,
} from '../../utils/reducerHelpers';

export const initialState = {
  users: {},
  editableUser: null,
  fetched: false,
};

export const reducers = {
  updateUsers: regularMergeReducer('users'),
  updateUser: regularSetByIdReducer('users'),
  deleteUser: regularUnsetReducer('users'),
  setFetched: regularSetReducer('fetched'),
  updateEditableUser: regularSetReducer('editableUser'),
};
