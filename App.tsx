import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppContext } from './src/context/AppContext';
import { TabNavigator } from './src/routes/TabNavigator';
import { Theme } from './src/types/enums/Color';

interface IAppProps {}

const App: FunctionComponent<IAppProps> = () => {
  const theme = Theme.Dark;
  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{ theme: theme }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
