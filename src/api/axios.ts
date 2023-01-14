import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../config';
import { StorageKey } from '../types/enums/StorageKey';
import { getStoredString } from '../utils/storage-utils';

export const api: AxiosInstance = axios.create({ baseURL: appConfig.baseUrl });
api.defaults.headers.post['Content-Type'] = 'application/json';

getStoredString(StorageKey.LoginToken)
  .then((token) => (api.defaults.headers.common['Authorization'] = `Bearer ${token}`))
  .catch((e) => e);
