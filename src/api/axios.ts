import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../config';

export const api: AxiosInstance = axios.create({ baseURL: appConfig.baseUrl });
api.defaults.headers.post['Content-Type'] = 'application/json';
