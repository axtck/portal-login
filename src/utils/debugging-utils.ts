/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logAsyncStorage = async () => {
  const allKeys = await AsyncStorage.getAllKeys();
  const values = await AsyncStorage.multiGet(allKeys);
  const object = Object.fromEntries(values);
  console.log(JSON.stringify(object, null, 2));
};
