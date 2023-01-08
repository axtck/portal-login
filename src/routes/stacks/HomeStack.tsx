import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AppRoute } from '../types/AppRoute';
import { RootStackParamList } from '../types/RootStackParamList';
import { Home } from '../../views/home/Home';
import { stackScreenOptions } from './styles/StackScreenOptions';
import { appRouteToTitle } from '../../utils/route-utils';

interface IHomeStackProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStack: FunctionComponent<IHomeStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoute.HomeStack} screenOptions={stackScreenOptions}>
      <Stack.Screen name={AppRoute.HomeStack} component={Home} options={homeStackOptions} />
    </Stack.Navigator>
  );
};

const homeStackOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.HomeStack),
};
