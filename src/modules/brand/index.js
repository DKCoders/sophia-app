import { reducers, initialState as state } from './reducers';
import effects from './effects';

const model = {
  state,
  reducers,
  effects,
};

export default model;
