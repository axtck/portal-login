import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../config';
import { StorageKey } from '../types/enums/StorageKey';
import { Null } from '../types/types';
import { getStoredString } from '../utils/storage-utils';

export const axiosInstance: AxiosInstance = axios.create({ baseURL: appConfig.baseUrl });
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthAxiosInstance = async (): Promise<AxiosInstance> => {
  const instance: AxiosInstance = axios.create({ baseURL: appConfig.baseUrl });

  instance.defaults.headers.post['Content-Type'] = 'application/json';
  const storedToken: Null<string> = await getStoredString(StorageKey.LoginToken);
  instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
  return instance;
};
