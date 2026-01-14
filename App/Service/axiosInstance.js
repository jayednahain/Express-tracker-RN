import axios from 'axios';
import { BASEURL } from './baseUrl';

import { attachInterceptors } from './apiInterceptors';

export const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

attachInterceptors(axiosInstance, 'JSON server local');
export default axiosInstance;
