import * as ImagePicker from 'expo-image-picker';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { TitleText } from '../../components/text/TitleText';
import { appConfig } from '../../config';
import { AppContext, IApp, IAppContext } from '../../context/AppContext';
import { IModal, IModalContext, initialModalContext, ModalContext, ModalKey } from '../../context/ModalContext';
import { initialDangerToast, initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { Palette } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { IProfile } from '../../types/models/Profile';
import { IUser } from '../../types/models/User';
import { IUserInfo } from '../../types/models/UserInfo';
import { IUserProfileImage } from '../../types/models/UserProfileImage';
import { Null } from '../../types/types';
import { storeObject } from '../../utils/storage-utils';
import { RootView } from '../core/RootView';

interface ISettingsProps {}

const profileImageModalOptions: IModal = {
  ...initialModalContext,
  title: 'Profile image',
  options: [
    { id: 1, name: 'edit' },
    { id: 2, name: 'delete' },
  ],
  key: ModalKey.SettingsProfileImage,
};

export const Settings: FC<ISettingsProps> = () => {
  const { appContext, setAppContext } = useContext<IAppContext>(AppContext);
  const { modalContext, setModalContext } = useContext<IModalContext>(ModalContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);

  const [user, setUser] = useState<Null<IUserInfo>>(null);
  const [image, setImage] = useState<Null<ImagePicker.ImagePickerResult>>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userInfo = await api.get<IUser>('/users/info');
        const profileInfo = await api.get<IProfile>('/profiles/info');
        const profileImages = await api.get<IUserProfileImage[]>(`/files/images/user/${appContext.userId}/profile`);

        setUser({ user: userInfo.data, profile: profileInfo.data, profileImages: profileImages.data });
      } catch {
        setToastContext({ ...initialDangerToast, message: 'Fetching user data failed' });
      }
    };

    initializeUser().catch((e) => e);
  }, []);

  useEffect(() => {
    if (!modalContext.selectedOption || modalContext.key !== ModalKey.SettingsProfileImage) return;
    const handlePick = async () => {
      switch (modalContext.selectedOption?.name) {
        case 'edit':
          await pickImage();
          break;
      }
    };

    handlePick().catch((e) => e);
    // TODO: do we need to reset the context somewhere?
  }, [modalContext.selectedOption]);

  const handleLogout = async () => {
    const updatedContext: IApp = { ...appContext, isLoggedIn: false };
    setAppContext(updatedContext);
    await storeObject<IApp>(StorageKey.AppContext, updatedContext);
    setToastContext({ ...initialSuccessToast, message: 'Successfully logged out' });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result);

    try {
      const { uri, type, fileName } = result.assets[0];
      const formData = new FormData();
      formData.append('file', { uri: uri, type: type || 'image', name: fileName || 'file' } as unknown as string);

      await api.post('/files/images/user/profile', formData, { headers: { 'Content-Type': 'multipart/formdata' } });
      setToastContext({ ...initialSuccessToast, message: 'Image successfully uploaded' });
    } catch {
      setToastContext({ ...initialDangerToast, message: 'Uploading image failed' });
    }
  };

  const handleOpenProfileImageModal = () => {
    setModalContext(profileImageModalOptions);
  };

  const activeImage = user?.profileImages?.find((i) => i.isActive);

  return (
    <RootView>
      <TitleText>Settings</TitleText>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleOpenProfileImageModal}>
            <View style={styles.imageContainer}>
              {image?.assets || activeImage ? (
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: image?.assets?.[0].uri || `${appConfig.baseUrl}/files/images/user/profile/${activeImage?.id}`,
                  }}
                />
              ) : (
                <Ionicons name="person-outline" size={80} />
              )}
            </View>
          </TouchableOpacity>
          {user?.user && <TitleText>{user.user.username}</TitleText>}
        </View>
        <View style={{ flex: 4, justifyContent: 'flex-end' }}>
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
});
