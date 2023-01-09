import React, { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AppRoute } from '../types/AppRoute';
import { RootStackParamList } from '../types/RootStackParamList';
import { stackScreenOptions } from './styles/StackScreenOptions';
import { appRouteToTitle } from '../../utils/route-utils';
import { Login } from '../../views/login/Login';
import { SignUp } from '../../views/login/SignUp';

interface ILoginStackProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const LoginStack: FC<ILoginStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoute.LoginStack} screenOptions={stackScreenOptions}>
      <Stack.Screen name={AppRoute.LoginStack} component={Login} options={loginStackOptions} />
      <Stack.Screen name={AppRoute.SignupScreen} component={SignUp} options={signupScreenOptions} />
    </Stack.Navigator>
  );
};

const loginStackOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.LoginStack),
};

const signupScreenOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.SignupScreen),
};
