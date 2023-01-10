import React, { createContext } from 'react';
import { Id, Null } from '../types/types';

export interface IModalOption {
  name: string;
  id: Id;
}

export enum ModalKey {
  None,
  SettingsProfileImage,
}

export interface IModal {
  key: ModalKey;
  title: string;
  options: IModalOption[];
  selectedOption: Null<IModalOption>;
}

export interface IModalContext {
  modalContext: IModal;
  setModalContext: React.Dispatch<React.SetStateAction<IModal>>;
}

export const initialModalContext: IModal = {
  key: ModalKey.None,
  title: '',
  options: [],
  selectedOption: null,
};

export const ModalContext: React.Context<IModalContext> = createContext({} as IModalContext);
