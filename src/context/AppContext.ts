import React, { createContext } from 'react';
import { Theme } from '../types/enums/Color';
import { Id } from '../types/types';

export interface IApp {
  userId: Id;
  isLoggedIn: boolean;
  theme: Theme;
}

export interface IAppContext {
  appContext: IApp;
  setAppContext: React.Dispatch<React.SetStateAction<IApp>>;
}

export const initialAppContext: IApp = {
  userId: 0,
  isLoggedIn: false,
  theme: Theme.Dark,
};

export const AppContext: React.Context<IAppContext> = createContext({} as IAppContext);
