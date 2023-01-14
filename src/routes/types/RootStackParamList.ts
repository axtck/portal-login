import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppRoute } from './AppRoute';

// type for root navigation stack params
export type RootStackParamList = {
  [AppRoute.MainStack]: undefined;
  [AppRoute.HomeStack]: undefined;
  [AppRoute.SettingsStack]: undefined;
  [AppRoute.LoginStack]: undefined;
  [AppRoute.SignupScreen]: undefined;
  [AppRoute.EditDeleteModal]: undefined;
  [AppRoute.ModifySettings]: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
