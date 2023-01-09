import React, { createContext } from 'react';
import { Palette, Theme } from '../types/enums/Color';
import { Id } from '../types/types';

export interface IApp {
  userId: Id;
  isLoggedIn: boolean;
  theme: Theme;
}

export interface INotification {
  theme: Palette;
  message: string;
  duration: number;
}

export interface IAppContext {
  appContext: IApp;
  setAppContext: React.Dispatch<React.SetStateAction<IApp>>;
  notificationContext: INotification;
  setNotificationContext: React.Dispatch<React.SetStateAction<INotification>>;
}

export const initialAppContext: IApp = {
  userId: 0,
  isLoggedIn: false,
  theme: Theme.Dark,
};

export const initialDangerNotification: INotification = {
  message: '',
  theme: Palette.Danger,
  duration: 2000,
};

export const initialSuccessNotification: INotification = {
  ...initialDangerNotification,
  theme: Palette.Success,
};

export const AppContext: React.Context<IAppContext> = createContext({} as IAppContext);
