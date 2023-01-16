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
import { ISettingsContext, SettingsContext } from '../../context/SettingsContext';
import { initialDangerToast, initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { AppRoute } from '../../routes/types/AppRoute';
import { RootStackNavigationProp } from '../../routes/types/RootStackParamList';
import { StorageKey } from '../../types/enums/StorageKey';
import { IProfile } from '../../types/models/Settings';
import { IUser } from '../../types/models/User';
import { IUserInfo } from '../../types/models/UserInfo';
import { IUserProfileImage } from '../../types/models/UserProfileImage';
import { Null } from '../../types/types';
import { getStoredString } from '../../utils/storage-utils';
import { RootView } from '../core/RootView';
import { EditOrDeleteModal, EditOrDeleteModalOption } from '../modals/EditOrDeleteModal';

interface ISettingsProps {}

export const Settings: FC<ISettingsProps> = () => {
  const { appContext } = useContext<IAppContext>(AppContext);
  const { settingsContext, setSettingsContext } = useContext<ISettingsContext>(SettingsContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);

  const [user, setUser] = useState<Null<IUserInfo>>(null);
  const [image, setImage] = useState<Null<ImagePicker.ImagePickerResult>>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedToken: Null<string> = await getStoredString(StorageKey.LoginToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        const userInfo = await api.get<IUser>('/users/info');
        const profileInfo = await api.get<IProfile>('/profiles/info');
        const profileImages = await api.get<IUserProfileImage[]>(`/files/images/user/${appContext.userId}/profile`);

        setUser({ user: userInfo.data, profile: profileInfo.data, profileImages: profileImages.data });
        setSettingsContext({ profile: profileInfo.data });
      } catch {
        setToastContext({ ...initialDangerToast, message: 'Fetching user data failed' });
      }
    };

    initializeUser().catch((e) => e);
  }, []);

  const handleConfirmModal = async (value: EditOrDeleteModalOption) => {
    switch (value) {
      case EditOrDeleteModalOption.Edit:
        await pickImage();
        break;
      case EditOrDeleteModalOption.Delete:
        break;
    }
    setModalVisible(false);
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
      setToastContext({ ...initialSuccessToast, message: 'Image successfully uploaded' }); // TODO: why not toasting?
    } catch {
      setToastContext({ ...initialDangerToast, message: 'Uploading image failed' });
    }
  };

  const activeImage = user?.profileImages?.find((i) => i.isActive);

  return (
    <RootView>
      <TitleText>Settings</TitleText>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
          {user?.user && settingsContext.profile.shouldDisplayUsername && <TitleText>{user.user.username}</TitleText>}
          <View style={{ marginTop: 6 }}>
            <IconButton iconName="settings-outline" onPress={() => navigation.navigate(AppRoute.ModifySettings)} />
          </View>
        </View>
      </View>
      <EditOrDeleteModal onSelected={handleConfirmModal} visible={modalVisible} />
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
