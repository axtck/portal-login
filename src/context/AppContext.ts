import React, { createContext } from 'react';
import { Theme } from '../types/enums/Color';

export interface IAppContext {
  theme: Theme;
}

const initialState: IAppContext = {
  theme: Theme.Dark,
};

export const AppContext: React.Context<IAppContext> = createContext(initialState);
