/* eslint-disable no-underscore-dangle,no-console */
import { brand as brandApi } from '../../services/api';
import { normalizator } from '../../utils/helpers';

const effects = {
  async fetchBrands() {
    const data = await brandApi.getAll();
    if (data && data.length) {
      this.updateBrands(normalizator(data));
      this.setFetched(true);
    }
  },
  async patchBrand({
    brandId, patch, resolve, reject,
  }) {
    try {
      const data = await brandApi.patch(brandId, patch);
      this.updateBrand(data);
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  },
};

export default effects;
