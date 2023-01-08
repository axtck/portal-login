import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { appRouteToTitle } from '../../utils/route-utils';
import { Main } from '../../views/main/Main';
import { AppRoute } from '../types/AppRoute';
import { RootStackParamList } from '../types/RootStackParamList';
import { stackScreenOptions } from './styles/StackScreenOptions';

interface IMainStackProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack: FunctionComponent<IMainStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoute.MainStack} screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name={AppRoute.MainStack} component={Main} options={mainStackOptions} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const mainStackOptions: NativeStackNavigationOptions = {
  title: appRouteToTitle(AppRoute.MainStack),
};
