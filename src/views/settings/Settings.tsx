import { useFocusEffect } from '@react-navigation/native';
import React, { FC, useCallback, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ActionButton } from '../../components/buttons/ActionButton';
import { TitleText } from '../../components/text/TitleText';
import { appConfig } from '../../config';
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
import { IProfile } from '../../types/models/Profile';
import { IUser } from '../../types/models/User';
import { IUserProfileImage } from '../../types/models/UserProfileImage';
import { storeObject } from '../../utils/storage-utils';
import { RootView } from '../core/RootView';

interface ISettingsProps {}

export const Settings: FC<ISettingsProps> = () => {
  const { appContext, setAppContext, setNotificationContext } = useContext<IAppContext>(AppContext);
  const { data: userInfo, error: userInfoError } = useFetch<IUser>('/users/info');
  const { data: profileInfo, error: profileInfoError } = useFetch<IProfile>('/profiles/info');
  const { data: userImages, error: userImagesError } = useFetch<IUserProfileImage[]>(
    `/files/images/user/${appContext.userId}/profile`,
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfoError) {
        setNotificationContext({ ...initialDangerNotification, message: 'Fetching user data failed' });
      }
      if (profileInfoError) {
        setNotificationContext({ ...initialDangerNotification, message: 'Fetching user profile failed' });
      }
      if (userImagesError) {
        setNotificationContext({ ...initialDangerNotification, message: 'Fetching user images failed' });
      }
    }, [userInfoError, profileInfoError, userImagesError]),
  );

  const handleLogout = async () => {
    const updatedContext: IApp = { ...appContext, isLoggedIn: false };
    setAppContext(updatedContext);
    await storeObject<IApp>(StorageKey.AppContext, updatedContext);
    setNotificationContext({ ...initialSuccessNotification, message: 'Successfully logged out' });
  };

  const activeImage = userImages?.find((i) => i.isActive);

  return (
    <RootView>
      <TitleText>Settings</TitleText>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            {activeImage ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: `${appConfig.baseUrl}/files/images/user/profile/${activeImage.id}`,
                }}
              />
            ) : (
              <View
                style={{
                  ...styles.profileImage,
                  backgroundColor: `#${profileInfo?.avatarColor}`,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TitleText>{userInfo?.username.charAt(0)}</TitleText>
              </View>
            )}
          </View>
          {userInfo && <TitleText>{userInfo.username}</TitleText>}
        </View>
        <View style={{ flex: 4, justifyContent: 'space-around', alignItems: 'center' }}>
          <ActionButton title="log out" onPress={handleLogout} theme={Palette.Danger} />
        </View>
      </View>
    </RootView>
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
  button: {
    marginTop: 16,
  },
});
