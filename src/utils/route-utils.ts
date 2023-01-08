import { AppRoute } from '../routes/types/AppRoute';

export const appRouteToTitle = (appRoute: AppRoute): string => {
  switch (appRoute) {
    case AppRoute.MainTab:
      return 'Main';
    case AppRoute.MainStack:
      return 'Main';
    case AppRoute.HomeStack:
      return 'Home';
    case AppRoute.HomeTab:
      return 'Home';
    case AppRoute.ProfileTab:
      return 'Profile';
    case AppRoute.ProfileStack:
      return 'Profile';
  }
};
