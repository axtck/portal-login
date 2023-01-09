import { NavigationContainer } from '@react-navigation/native';
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { axiosInstance } from './src/api/axios';
import {
  AppContext,
  IApp,
  IAppContext,
  initialAppContext,
  initialDangerNotification,
  INotification,
} from './src/context/AppContext';
import { LoginStack } from './src/routes/stacks/LoginStack';
import { TabNavigator } from './src/routes/TabNavigator';
import { StorageKey } from './src/types/enums/StorageKey';
import { Null } from './src/types/types';
import { getStoredObject, getStoredString } from './src/utils/storage-utils';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View } from 'react-native';

interface IAppProps {}

SplashScreen.preventAutoHideAsync();

const App: FC<IAppProps> = () => {
  const { appContext: currentAppContext, notificationContext: currentNotificationContext } =
    useContext<IAppContext>(AppContext);

  const [fontsLoaded] = Font.useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });

  // set the initial state for context
  const [appContext, setAppContext] = useState<IApp>(currentAppContext ?? initialAppContext);
  const [notificationContext, setNotificationContext] = useState<INotification>(
    currentNotificationContext ?? initialDangerNotification,
  );

  // memoize the provider value
  const providerValue: IAppContext = useMemo(() => {
    return {
      appContext: appContext,
      setAppContext: setAppContext,
      notificationContext: notificationContext,
      setNotificationContext: setNotificationContext,
    };
  }, [appContext, setAppContext, notificationContext, setNotificationContext]);

  useEffect(() => {
    const checkStoredContext = async () => {
      const storedGameSettings: Null<IApp> = await getStoredObject<IApp>(StorageKey.AppContext);
      if (!storedGameSettings) return;
      setAppContext(storedGameSettings);
    };

    const checkStoredToken = async () => {
      const storedToken: Null<string> = await getStoredString(StorageKey.LoginToken);
      if (!storedToken) return;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    };

    checkStoredContext().catch((e) => e);
    checkStoredToken().catch((e) => e);
  }, []);

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        //
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    void prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!appIsReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppContext.Provider value={providerValue}>
        <NavigationContainer>{appContext.isLoggedIn ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
      </AppContext.Provider>
    </View>
  );
};

export default App;
