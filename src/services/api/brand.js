import axios from 'axios';
import Auth from '../auth';
import { API } from '../../config/apiPaths';
import { notAuthorizedResolver } from '../../utils/helpers';

class Brand {
  static getAll() {
    return notAuthorizedResolver(() => axios.get(`${API}/brands`, Auth.authHeader));
  }
  static async patch(brandId, patch) {
    return notAuthorizedResolver(() => axios.patch(`${API}/brands/${brandId}`, patch, Auth.authHeader));
  }
}

export default Brand;
