import axios from 'axios';
import { apiUrl } from '../config/paths';
import Auth from './auth';

class Api {
  static get authHeader() {
    const Authorization = Auth.getToken();
    return { headers: { Authorization } };
  }

  static async getBrands() {
    const response = await axios.get(`${apiUrl}/brands?!audit._deletedAt`, Api.authHeader);
    return response.data.data;
  }

  static async patchBrand(brandId, patch) {
    const response = await axios.patch(`${apiUrl}/brands/${brandId}`, patch, Api.authHeader);
    return response.data.data;
  }

  static async postBrand(post) {
    const response = await axios.post(`${apiUrl}/brands`, post, Api.authHeader);
    return response.data.data;
  }

  static async deleteBrand(brandId) {
    const response = await axios.delete(`${apiUrl}/brands/${brandId}`, Api.authHeader);
    return response.data.data;
  }

  static async getCategories() {
    const response = await axios.get(`${apiUrl}/categories?!audit._deletedAt`, Api.authHeader);
    return response.data.data;
  }

  static async patchCategory(categoryId, patch) {
    const response = await axios.patch(`${apiUrl}/categories/${categoryId}`, patch, Api.authHeader);
    return response.data.data;
  }

  static async postCategory(post) {
    const response = await axios.post(`${apiUrl}/categories`, post, Api.authHeader);
    return response.data.data;
  }

  static async deleteCategory(categoryId) {
    const response = await axios.delete(`${apiUrl}/categories/${categoryId}`, Api.authHeader);
    return response.data.data;
  }

  static async getUsers() {
    const response = await axios.get(`${apiUrl}/users?!audit._deletedAt`, Api.authHeader);
    return response.data.data;
  }

  static async patchUser(userId, patch) {
    const response = await axios.patch(`${apiUrl}/users/${userId}`, patch, Api.authHeader);
    return response.data.data;
  }

  static async postUser(post) {
    const response = await axios.post(`${apiUrl}/users`, post, Api.authHeader);
    return response.data.data;
  }

  static async deleteUser(userId) {
    const response = await axios.delete(`${apiUrl}/users/${userId}`, Api.authHeader);
    return response.data.data;
  }

  static async uploadImg(data) {
    const response = await axios.post(`${apiUrl}/imgs-loader/upload`, data, Api.authHeader);
    return response.data.data;
  }
}

export default Api;
