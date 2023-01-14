import React, { FC, useContext } from 'react';
import { View, Text } from 'react-native';
import { ActionButton } from '../../components/buttons/ActionButton';
import { TitleText } from '../../components/text/TitleText';
import { IAppContext, AppContext, IApp } from '../../context/AppContext';
import { initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { Palette } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { storeObject } from '../../utils/storage-utils';
import { RootView } from '../core/RootView';

interface IModifySettingsProps {}

export const ModifySettings: FC<IModifySettingsProps> = () => {
  const { appContext, setAppContext } = useContext<IAppContext>(AppContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);

  const handleLogout = async () => {
    const updatedContext: IApp = { ...appContext, isLoggedIn: false };
    setAppContext(updatedContext);
    await storeObject<IApp>(StorageKey.AppContext, updatedContext);
    setToastContext({ ...initialSuccessToast, message: 'Successfully logged out' });
  };

  return (
    <RootView>
      <TitleText>Modify settings</TitleText>
      <View style={{ flex: 2, justifyContent: 'flex-end' }}>
        <ActionButton title="log out" onPress={handleLogout} theme={Palette.Danger} />
      </View>
    </RootView>
  );
};
