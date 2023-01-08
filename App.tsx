import { NavigationContainer } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { AppContext, IAppContext } from './src/context/AppContext';
import { LoginStack } from './src/routes/stacks/LoginStack';
import { TabNavigator } from './src/routes/TabNavigator';
import { Theme } from './src/types/enums/Color';
import { StorageKey } from './src/types/enums/StorageKey';
import { Null } from './src/types/types';
import { getStoredObject } from './src/utils/storage-utils';

interface IAppProps {}

const App: FC<IAppProps> = () => {
  const [stored, setStored] = useState<Null<IAppContext>>(null);

  useEffect(() => {
    const setStoredGameSettings = async () => {
      const storedGameSettings: Null<IAppContext> = await getStoredObject<IAppContext>(StorageKey.AppContext);
      setStored(storedGameSettings);
    };
    setStoredGameSettings().catch((e) => e);
  }, []);

  const theme = stored?.theme ?? Theme.Dark;
  const isLoggedIn = stored?.isLoggedIn ?? false;
  return (
    <AppContext.Provider value={{ theme: theme, isLoggedIn: isLoggedIn }}>
      <NavigationContainer>{isLoggedIn ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
