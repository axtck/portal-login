import React, { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AppRoute } from '../types/AppRoute';
import { RootStackParamList } from '../types/RootStackParamList';
import { Settings } from '../../views/settings/Settings';
import { stackScreenOptions } from './styles/StackScreenOptions';
import { appRouteToTitle } from '../../utils/route-utils';

interface ISettingsStackProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const SettingsStack: FC<ISettingsStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoute.SettingsStack} screenOptions={stackScreenOptions}>
      <Stack.Screen name={AppRoute.SettingsStack} component={Settings} options={profileStackOptions} />
    </Stack.Navigator>
  );
};

const profileStackOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.SettingsStack),
};
