import axios from 'axios';
import PATH from '../config/paths';

// TODO: save token
class Auth {
  static async login({ username, email, password }) {
    const response = await axios.post(`${PATH.apiUrl}/auth/login`, { username, email, password });
    if (response.headers.authorization) {
      localStorage.setItem('access_token', response.headers.authorization);
    }
    return response.data.data;
  }

  static getToken() {
    return localStorage.getItem('access_token');
  }

  static logout() {
    return localStorage.removeItem('access_token');
  }
}

export default Auth;
