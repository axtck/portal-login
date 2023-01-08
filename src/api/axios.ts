import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../config';

export const instance: AxiosInstance = axios.create({
  baseURL: appConfig.baseUrl,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
