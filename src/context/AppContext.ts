import React, { createContext } from 'react';
import { Theme } from '../types/enums/Color';

export interface IAppContext {
  theme: Theme;
  isLoggedIn: boolean;
}

const initialState: IAppContext = {
  theme: Theme.Dark,
  isLoggedIn: false,
};

export const AppContext: React.Context<IAppContext> = createContext(initialState);
