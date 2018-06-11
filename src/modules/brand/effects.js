/* eslint-disable no-underscore-dangle */
import api from '../../services/api';

const effects = {
  async fetchBrands() {
    const data = await api.getBrands();
    if (data && data.length) {
      this.updateBrands(data.reduce((acum, item) => ({ ...acum, [item._id]: item }), {}));
      this.setFetched(true);
    }
  },
};

export default effects;
