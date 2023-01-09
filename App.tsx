import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
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

interface IAppProps {}

void SplashScreen.preventAutoHideAsync();

const App: FC<IAppProps> = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { appContext: currentAppContext, notificationContext: currentNotificationContext } =
    useContext<IAppContext>(AppContext);

  const [fontsLoaded] = Font.useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
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
    async function prepare() {
      try {
        const checkStoredContext = async () => {
          const storedGameSettings: Null<IApp> = await getStoredObject<IApp>(StorageKey.AppContext);
          if (!storedGameSettings) return;
          setAppContext(storedGameSettings);
        };

        const checkStoredToken = async () => {
          const storedToken: Null<string> = await getStoredString(StorageKey.LoginToken);
          if (!storedToken) return;
        };

        checkStoredContext().catch((e) => e);
        checkStoredToken().catch((e) => e);
      } catch (e) {
        setNotificationContext({ ...initialDangerNotification, message: 'Preparing app failed' });
      } finally {
        setAppIsReady(true);
      }
    }

    prepare().catch((e) => e);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppContext.Provider value={providerValue}>
        <NavigationContainer>{appContext.isLoggedIn ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
      </AppContext.Provider>
    </View>
  );
};

export default App;
