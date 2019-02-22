/* eslint-disable no-underscore-dangle,no-console */
import api from '../../services/api';

const effects = {
  async fetchBrands() {
    const data = await api.getBrands();
    if (data && data.length) {
      this.updateBrands(data.reduce((acum, item) => ({ ...acum, [item._id]: item }), {}));
      this.setFetched(true);
    }
  },
  async patchBrand({
    brandId, patch, resolve, reject,
  }) {
    try {
      const data = brandId ? await api.patchBrand(brandId, patch) : await api.postBrand(patch);
      this.updateBrand(data);
      if (resolve) resolve(data._id);
    } catch (err) {
      console.log(err);
      if (reject) reject(err);
    }
  },
  async removeBrand({ brandId, resolve, reject }) {
    try {
      await api.deleteBrand(brandId);
      this.deleteBrand([brandId]);
      if (resolve) resolve(brandId);
    } catch (err) {
      console.log(err);
      if (reject) reject(err);
    }
  },
};

export default effects;
