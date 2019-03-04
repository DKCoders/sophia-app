export const categoriesAsArray = state => Object.values(state.category.categories);
export const categoryById = (state, { id }) => state.category.categories[id];
