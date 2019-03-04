/* eslint-disable no-underscore-dangle,no-console */
import api from '../../services/api';

const effects = {
  async fetchCategories() {
    const data = await api.getCategories();
    if (data && data.length) {
      this.updateCategories(data.reduce((acum, item) => ({ ...acum, [item._id]: item }), {}));
      this.setFetched(true);
    }
  },
  async patchCategory({
    categoryId, patch, resolve, reject,
  }) {
    try {
      const data = categoryId
        ? await api.patchCategory(categoryId, patch)
        : await api.postCategory(patch);
      this.updateCategory(data);
      if (resolve) resolve(data._id);
    } catch (err) {
      console.log(err);
      if (reject) reject(err);
    }
  },
  async removeCategory({ categoryId, resolve, reject }) {
    try {
      await api.deleteCategory(categoryId);
      this.deleteCategory([categoryId]);
      if (resolve) resolve(categoryId);
    } catch (err) {
      console.log(err);
      if (reject) reject(err);
    }
  },
};

export default effects;
