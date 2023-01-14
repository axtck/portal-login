import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api } from '../../api/axios';
import { IconButton } from '../../components/buttons/IconButton';
import { TitleText } from '../../components/text/TitleText';
import { appConfig } from '../../config';
import { AppContext, IAppContext } from '../../context/AppContext';
import { IModal, IModalContext, initialModalContext, ModalContext, ModalKey } from '../../context/ModalContext';
import { initialDangerToast, initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { AppRoute } from '../../routes/types/AppRoute';
import { RootStackNavigationProp } from '../../routes/types/RootStackParamList';
import { IProfile } from '../../types/models/Profile';
import { IUser } from '../../types/models/User';
import { IUserInfo } from '../../types/models/UserInfo';
import { IUserProfileImage } from '../../types/models/UserProfileImage';
import { Null } from '../../types/types';
import { RootView } from '../core/RootView';

interface ISettingsProps {}

const profileImageModalOptions: IModal = {
  ...initialModalContext,
  title: 'Profile image',
  options: [{ id: 1, name: 'edit' }],
  key: ModalKey.SettingsProfileImage,
};

export const Settings: FC<ISettingsProps> = () => {
  const { appContext } = useContext<IAppContext>(AppContext);
  const { modalContext, setModalContext } = useContext<IModalContext>(ModalContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);

  const [user, setUser] = useState<Null<IUserInfo>>(null);
  const [image, setImage] = useState<Null<ImagePicker.ImagePickerResult>>(null);

  const navigation = useNavigation<RootStackNavigationProp>();

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

  const handleModify = () => {
    navigation.navigate(AppRoute.ModifySettings);
  };

  const activeImage = user?.profileImages?.find((i) => i.isActive);

  return (
    <RootView>
      <TitleText>Settings</TitleText>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, alignItems: 'center' }}>
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
          <View style={{ marginTop: 6 }}>
            <IconButton iconName="settings-outline" onPress={handleModify} />
          </View>
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
