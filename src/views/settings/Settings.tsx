import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { FC, useCallback, useContext, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getAuthAxiosFileInstance } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { TitleText } from '../../components/text/TitleText';
import { appConfig } from '../../config';
import { AppContext, IApp, IAppContext } from '../../context/AppContext';
import { IModal, IModalContext, initialModalContext, ModalContext, ModalKey } from '../../context/ModalContext';
import { initialDangerToast, initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { useFetch } from '../../hooks/useFetch';
import { Palette } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { IProfile } from '../../types/models/Profile';
import { IUser } from '../../types/models/User';
import { IUserProfileImage } from '../../types/models/UserProfileImage';
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
  // const [image, setImage] = useState<Null<ImagePicker.ImagePickerResult>>(null);
  const { appContext, setAppContext } = useContext<IAppContext>(AppContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);
  const { modalContext, setModalContext } = useContext<IModalContext>(ModalContext);
  const { data: userInfo, error: userInfoError } = useFetch<IUser>('/users/info');
  const { error: profileInfoError } = useFetch<IProfile>('/profiles/info');
  const { data: userImages, error: userImagesError } = useFetch<IUserProfileImage[]>(
    `/files/images/user/${appContext.userId}/profile`,
  );

  useEffect(() => {
    if (!modalContext.selectedOption) return;
    if (modalContext.key === ModalKey.SettingsProfileImage) {
      const handlePick = async () => {
        switch (modalContext?.selectedOption?.name) {
          case 'edit':
            await pickImage();
            break;
          case 'delete':
            return;
        }
      };
      handlePick().catch((e) => e);
    }
  }, [modalContext.selectedOption]);

  useFocusEffect(
    useCallback(() => {
      if (userInfoError) {
        setToastContext({ ...initialDangerToast, message: 'Fetching user data failed' });
      }
      if (profileInfoError) {
        setToastContext({ ...initialDangerToast, message: 'Fetching user profile failed' });
      }
      if (userImagesError) {
        setToastContext({ ...initialDangerToast, message: 'Fetching user images failed' });
      }
    }, [userInfoError, profileInfoError, userImagesError]),
  );

  const handleLogout = async () => {
    const updatedContext: IApp = { ...appContext, isLoggedIn: false };
    setAppContext(updatedContext);
    await storeObject<IApp>(StorageKey.AppContext, updatedContext);
    setToastContext({ ...initialSuccessToast, message: 'Successfully logged out' });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    // setImage(result);

    try {
      const { uri, type, fileName } = result.assets[0];
      const formData = new FormData();
      formData.append('file', { uri: uri, type: type, name: fileName || 'file' } as unknown as string);

      const authorizedAxiosInstance = await getAuthAxiosFileInstance();
      await authorizedAxiosInstance.post('/files/images/user/profile', formData);
    } catch {
      setToastContext({ ...initialDangerToast, message: 'Uploading image failed' });
    }
  };

  const handleOpenProfileImageModal = () => {
    setModalContext(profileImageModalOptions);
  };

  const activeImage = userImages?.find((i) => i.isActive);

  return (
    <RootView>
      <TitleText>Settings</TitleText>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleOpenProfileImageModal}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: `${appConfig.baseUrl}/files/images/user/profile/${activeImage?.id}`,
                }}
              />
            </View>
          </TouchableOpacity>
          {userInfo && <TitleText>{userInfo.username}</TitleText>}
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
