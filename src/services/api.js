import axios from 'axios';
import { apiUrl } from '../config/paths';
import Auth from './auth';

class Api {
  static get authHeader() {
    const Authorization = Auth.getToken();
    return { headers: { Authorization } };
  }

  static async getBrands() {
    const response = await axios.get(`${apiUrl}/brands`, Api.authHeader);
    return response.data.data;
  }

  static async patchBrand(brandId, patch) {
    const response = await axios.patch(`${apiUrl}/brands/${brandId}`, patch, Api.authHeader);
    return response.data.data;
  }

  static async uploadImg(data) {
    const response = await axios.post(`${apiUrl}/imgs-loader/upload`, data, Api.authHeader);
    return response.data.data;
  }
}

export default Api;
