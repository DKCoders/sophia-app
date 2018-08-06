import { create } from 'proppy';

// eslint-disable-next-line import/prefer-default-export
export function withRematch(stateName, dispatcherName, reducers, initialState) {
  return create({
    initialize() {
      this.props[stateName] = initialState;
      this.props[dispatcherName] = (type, ...payload) => {
        this.set({
          [stateName]: reducers[type](this.props[stateName], ...payload),
        });
      };
      Object.keys(reducers).forEach((key) => {
        this.props[dispatcherName][key] = (...payload) => {
          this.props[dispatcherName](key, ...payload);
        };
      });
    },
  });
}
