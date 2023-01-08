import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AppRoute } from '../types/AppRoute';
import { RootStackParamList } from '../types/RootStackParamList';
import { Profile } from '../../views/profile/Profile';
import { stackScreenOptions } from './styles/StackScreenOptions';
import { appRouteToTitle } from '../../utils/route-utils';

interface IProfileStackProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ProfileStack: FunctionComponent<IProfileStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoute.ProfileStack} screenOptions={stackScreenOptions}>
      <Stack.Screen name={AppRoute.ProfileStack} component={Profile} options={profileStackOptions} />
    </Stack.Navigator>
  );
};

const profileStackOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.ProfileStack),
};
