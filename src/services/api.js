import axios from 'axios';
import PATHS from '../config/paths';
import Auth from './auth';

const { apiUrl } = PATHS;

class Api {
  static get authHeader() {
    const Authorization = Auth.getToken();
    return { headers: { Authorization } };
  }

  static async getBrands() {
    const response = await axios.get(`${apiUrl}/brands`, Api.authHeader);
    return response.data.data;
  }
}

export default Api;
