import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { ActionButton } from '../../components/buttons/ActionButton';
import { IAppContext } from '../../context/AppContext';
import { AppRoute } from '../../routes/types/AppRoute';
import { RootStackNavigationProp } from '../../routes/types/RootStackParamList';
import { Palette, Theme } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { getStoredObject, storeObject } from '../../utils/storage-utils';

interface IProfileProps {}

export const Profile: FC<IProfileProps> = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = async () => {
    try {
      const currentContext = await getStoredObject<IAppContext>(StorageKey.AppContext);
      await storeObject<IAppContext>(StorageKey.AppContext, {
        theme: currentContext?.theme ?? Theme.Dark, // TODO: find something for this
        isLoggedIn: false,
      });
      navigation.navigate(AppRoute.HomeStack);
    } catch {
      //
    }
  };

  return <ActionButton title="log out" onPress={handleLogout} theme={Palette.Danger} />;
};
