/* eslint-disable no-underscore-dangle,no-console */
import api from '../../services/api';

const effects = {
  async fetchUsers() {
    const data = await api.getUsers();
    if (data && data.length) {
      this.updateUsers(data.reduce((acum, item) => ({ ...acum, [item._id]: item }), {}));
      this.setFetched(true);
    }
  },
  async patchUser({
    userId, patch, resolve, reject,
  }) {
    try {
      const data = userId ? await api.patchUser(userId, patch) : await api.postUser(patch);
      this.updateUser(data);
      if (resolve) resolve(data._id);
    } catch (err) {
      console.log(err);
      if (reject) reject(err);
    }
  },
  async removeUser({ userId, resolve, reject }) {
    try {
      await api.deleteUser(userId);
      this.deleteUser([userId]);
      if (resolve) resolve(userId);
    } catch (err) {
      console.log(err);
      if (reject) reject(err);
    }
  },
};

export default effects;
