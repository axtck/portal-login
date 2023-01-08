import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppRoute } from './AppRoute';

// type for root navigation stack params
export type RootStackParamList = {
  [AppRoute.MainStack]: undefined;
  [AppRoute.HomeStack]: undefined;
  [AppRoute.ProfileStack]: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
