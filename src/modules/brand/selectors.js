export const brandsAsArray = state => Object.values(state.brand.brands);
export const brandById = (state, { id }) => state.brand.brands[id];
