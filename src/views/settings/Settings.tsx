import { useFocusEffect } from '@react-navigation/native';
import React, { FC, useCallback, useContext } from 'react';
import { Image, ScrollView, Text, StyleSheet, View } from 'react-native';
import { ActionButton } from '../../components/buttons/ActionButton';
import { TitleText } from '../../components/text/TitleText';
import { appConfig } from '../../config';
import { NotificationContainer } from '../../containers/NotificationContainer';
import {
  AppContext,
  IApp,
  IAppContext,
  initialDangerNotification,
  initialSuccessNotification,
} from '../../context/AppContext';
import { useFetch } from '../../hooks/useFetch';
import { Palette } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { IUser } from '../../types/models/User';
import { IUserProfileImage } from '../../types/models/UserProfileImage';
import { storeObject } from '../../utils/storage-utils';

interface ISettingsProps {}

export const Settings: FC<ISettingsProps> = () => {
  const { appContext, setAppContext, setNotificationContext } = useContext<IAppContext>(AppContext);
  const { data: userInfo, error: userInfoError } = useFetch<IUser>('/users/info');
  const { data: userImages, error: userImagesError } = useFetch<IUserProfileImage[]>(
    `/files/images/user/${appContext.userId}/profile`,
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfoError) {
        setNotificationContext({ ...initialDangerNotification, message: 'Fetching user data failed' });
      }
      if (userImagesError) {
        setNotificationContext({ ...initialDangerNotification, message: 'Fetching user images failed' });
      }
    }, [userInfoError]),
  );

  const handleLogout = async () => {
    const updatedContext: IApp = { ...appContext, isLoggedIn: false };
    setAppContext(updatedContext);
    await storeObject<IApp>(StorageKey.AppContext, updatedContext);
    setNotificationContext({ ...initialSuccessNotification, message: 'Successfully logged out' });
  };

  return (
    <React.Fragment>
      <NotificationContainer />
      <ScrollView contentContainerStyle={styles.container}>
        {userImages && (
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `${appConfig.baseUrl}/files/images/user/profile/${userImages.find((i) => i.isActive)?.id}`,
              }}
            />
          </View>
        )}
        {userInfo && <TitleText>{userInfo.username}</TitleText>}
        <ActionButton title="log out" onPress={handleLogout} theme={Palette.Danger} />
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 16,
  },
});
