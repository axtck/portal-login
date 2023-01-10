import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appRouteToTitle } from '../utils/route-utils';
import { HomeStack } from './stacks/HomeStack';
import { MainStack } from './stacks/MainStack';
import { SettingsStack } from './stacks/SettingsStack';
import { AppRoute } from './types/AppRoute';

interface ITabNavigatorProps {}

const Tab = createBottomTabNavigator();

export const TabNavigator: FC<ITabNavigatorProps> = () => {
  return (
    <Tab.Navigator initialRouteName={AppRoute.MainTab} screenOptions={screenOptions}>
      <Tab.Screen name={AppRoute.MainTab} component={MainStack} options={mainScreenOptions} />
      <Tab.Screen name={AppRoute.HomeTab} component={HomeStack} options={homeScreenOptions} />
      <Tab.Screen name={AppRoute.SettingsTab} component={SettingsStack} options={settingsScreenOptions} />
    </Tab.Navigator>
  );
};

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    marginBottom: 4,
  },
};

const mainScreenOptions: BottomTabNavigationOptions = {
  title: appRouteToTitle(AppRoute.MainTab),
  tabBarIcon: ({ size }) => <Ionicons name={'rocket-outline'} size={size} color="black" />,
};

const homeScreenOptions: BottomTabNavigationOptions = {
  title: appRouteToTitle(AppRoute.HomeTab),
  tabBarIcon: ({ size }) => <Ionicons name={'home-outline'} size={size} color="black" />,
};

const settingsScreenOptions: BottomTabNavigationOptions = {
  title: appRouteToTitle(AppRoute.SettingsTab),
  tabBarIcon: ({ size }) => <Ionicons name={'settings-outline'} size={size} color="black" />,
};
