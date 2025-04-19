import {tokenStorage} from '@state/storage';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = tokenStorage.getString('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers['api_key'] = 'Random_api_key';
    }
    return config;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Generate new access token with the help of refresh token
    }
  },
);
