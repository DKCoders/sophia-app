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
      const data = await api.patchBrand(brandId, patch);
      this.updateBrand(data);
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  },
};

export default effects;
