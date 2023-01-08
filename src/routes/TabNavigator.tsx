import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FunctionComponent } from 'react';
import { AppRoute } from './types/AppRoute';
import { MainStack } from './stacks/MainStack';
import { HomeStack } from './stacks/HomeStack';
import { ProfileStack } from './stacks/ProfileStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appRouteToTitle } from '../utils/route-utils';

interface ITabNavigatorProps {}

const Tab = createBottomTabNavigator();

export const TabNavigator: FunctionComponent<ITabNavigatorProps> = () => {
  return (
    <Tab.Navigator initialRouteName={AppRoute.HomeTab} screenOptions={screenOptions}>
      <Tab.Screen name={AppRoute.MainTab} component={MainStack} options={mainScreenOptions} />
      <Tab.Screen name={AppRoute.HomeTab} component={HomeStack} options={homeScreenOptions} />
      <Tab.Screen name={AppRoute.ProfileTab} component={ProfileStack} options={profileScreenOptions} />
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

const profileScreenOptions: BottomTabNavigationOptions = {
  title: appRouteToTitle(AppRoute.ProfileTab),
  tabBarIcon: ({ size }) => <Ionicons name={'settings-outline'} size={size} color="black" />,
};
