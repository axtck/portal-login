import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../types/enums/StorageKey';
import { Null } from '../types/types';

export const storeString = async (key: StorageKey, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    return;
  }
};

export const storeObject = async <T>(key: StorageKey, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};

export const getStoredString = async (key: StorageKey): Promise<Null<string>> => {
  try {
    const item: Null<string> = await AsyncStorage.getItem(key);
    return item || null;
  } catch {
    return null;
  }
};

export const getStoredObject = async <T>(key: StorageKey): Promise<Null<T>> => {
  try {
    const item: Null<string> = await AsyncStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  } catch {
    return null;
  }
};
