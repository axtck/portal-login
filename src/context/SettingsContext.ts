import React, { createContext } from 'react';
import { IProfile } from '../types/models/Settings';

export interface ISettings {
  profile: IProfile;
}

export interface ISettingsContext {
  settingsContext: ISettings;
  setSettingsContext: React.Dispatch<React.SetStateAction<ISettings>>;
}

export const initialSettingsContext: ISettings = {
  profile: {
    userId: 0,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    shouldDisplayUsername: true,
  },
};

export const SettingsContext: React.Context<ISettingsContext> = createContext({} as ISettingsContext);
