import React, { FC, useMemo, useState } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AppRoute } from '../types/AppRoute';
import { RootStackParamList } from '../types/RootStackParamList';
import { Settings } from '../../views/settings/Settings';
import { stackScreenOptions } from './styles/StackScreenOptions';
import { appRouteToTitle } from '../../utils/route-utils';
import { ModifySettings } from '../../views/settings/ModifySettings';
import { initialSettingsContext, ISettings, ISettingsContext, SettingsContext } from '../../context/SettingsContext';

interface ISettingsStackProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const SettingsStack: FC<ISettingsStackProps> = () => {
  // app context
  const [settingsContext, setSettingsContext] = useState<ISettings>(initialSettingsContext);
  const settingsContextProviderValue: ISettingsContext = useMemo(() => {
    return { settingsContext: settingsContext, setSettingsContext: setSettingsContext };
  }, [settingsContext, setSettingsContext]);

  return (
    <SettingsContext.Provider value={settingsContextProviderValue}>
      <Stack.Navigator initialRouteName={AppRoute.SettingsStack} screenOptions={stackScreenOptions}>
        <Stack.Screen name={AppRoute.SettingsStack} component={Settings} options={profileStackOptions} />
        <Stack.Screen name={AppRoute.ModifySettings} component={ModifySettings} options={modifySettingsOptions} />
      </Stack.Navigator>
    </SettingsContext.Provider>
  );
};

const profileStackOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.SettingsStack),
};

const modifySettingsOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.ModifySettings),
};
