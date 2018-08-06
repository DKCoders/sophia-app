import { createSelector } from 'reselect';

export const brandsSelector = state => state.brand.brands;
export const brandByIdSelector = (state, { id }) => state.brand.brands[id];

export const brandsArraySelector = createSelector(
  brandsSelector,
  brands => Object.values(brands),
);
