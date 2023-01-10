import React, { createContext } from 'react';
import { Palette } from '../types/enums/Color';

export interface IToast {
  theme: Palette;
  message: string;
  duration: number;
}

export interface IToastContext {
  toastContext: IToast;
  setToastContext: React.Dispatch<React.SetStateAction<IToast>>;
}

export const initialDangerToast: IToast = {
  message: '',
  theme: Palette.Danger,
  duration: 2000,
};

export const initialSuccessToast: IToast = {
  ...initialDangerToast,
  theme: Palette.Success,
};

export const ToastContext: React.Context<IToastContext> = createContext({} as IToastContext);
