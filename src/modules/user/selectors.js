export const usersAsArray = state => Object.values(state.user.users);
export const userById = (state, { id }) => state.user.users[id];
