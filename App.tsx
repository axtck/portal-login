import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { AppContext, IApp, IAppContext, initialAppContext } from './src/context/AppContext';
import { IModal, IModalContext, initialModalContext, ModalContext } from './src/context/ModalContext';
import { initialDangerToast, IToast, IToastContext, ToastContext } from './src/context/ToastContext';
import { LoginStack } from './src/routes/stacks/LoginStack';
import { TabNavigator } from './src/routes/TabNavigator';
import { StorageKey } from './src/types/enums/StorageKey';
import { Null } from './src/types/types';
import { getStoredObject, getStoredString } from './src/utils/storage-utils';

interface IAppProps {}

void SplashScreen.preventAutoHideAsync();

const App: FC<IAppProps> = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = Font.useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });

  // app context
  const [appContext, setAppContext] = useState<IApp>(initialAppContext);
  const appContextProviderValue: IAppContext = useMemo(() => {
    return { appContext: appContext, setAppContext: setAppContext };
  }, [appContext, setAppContext]);

  // toast context
  const [toastContext, setToastContext] = useState<IToast>(initialDangerToast);
  const toastContextProviderValue: IToastContext = useMemo(() => {
    return { toastContext: toastContext, setToastContext: setToastContext };
  }, [toastContext, setToastContext]);

  // modal context
  const [modalContext, setModalContext] = useState<IModal>(initialModalContext);
  const modalContextProviderValue: IModalContext = useMemo(() => {
    return { modalContext: modalContext, setModalContext: setModalContext };
  }, [modalContext, setModalContext]);

  // prepare app on first load
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
        setToastContext({ ...initialDangerToast, message: 'Preparing app failed' });
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
      <AppContext.Provider value={appContextProviderValue}>
        <ToastContext.Provider value={toastContextProviderValue}>
          <ModalContext.Provider value={modalContextProviderValue}>
            <NavigationContainer>{appContext.isLoggedIn ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
          </ModalContext.Provider>
        </ToastContext.Provider>
      </AppContext.Provider>
    </View>
  );
};

export default App;
