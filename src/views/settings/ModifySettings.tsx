import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { FC, useContext, useState } from 'react';
import { View } from 'react-native';
import { api } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { ActionSwitch } from '../../components/switches/ActionSwitch';
import { ParagraphText } from '../../components/text/ParagraphText';
import { TitleText } from '../../components/text/TitleText';
import { AppContext, IApp, IAppContext } from '../../context/AppContext';
import { ISettingsContext, SettingsContext } from '../../context/SettingsContext';
import { initialDangerToast, initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { AppRoute } from '../../routes/types/AppRoute';
import { RootStackNavigationProp } from '../../routes/types/RootStackParamList';
import { Palette } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { IProfile } from '../../types/models/Settings';
import { storeObject } from '../../utils/storage-utils';
import { RootView } from '../core/RootView';
import { ConfirmModal, ConfirmModalOption } from '../modals/ConfirmModal';

interface IModifySettingsProps {}

export const ModifySettings: FC<IModifySettingsProps> = () => {
  const { appContext, setAppContext } = useContext<IAppContext>(AppContext);
  const { settingsContext, setSettingsContext } = useContext<ISettingsContext>(SettingsContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);

  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = async () => {
    const updatedContext: IApp = { ...appContext, isLoggedIn: false };
    setAppContext(updatedContext);
    await storeObject<IApp>(StorageKey.AppContext, updatedContext);
    setToastContext({ ...initialSuccessToast, message: 'Successfully logged out' });
  };

  const handleSubmit = async (values: IProfile) => {
    try {
      await api.put('/profiles', values);
      setSettingsContext({ profile: values });
      setToastContext({ ...initialSuccessToast, message: 'Successfully updated settings' });
      navigation.navigate(AppRoute.SettingsStack);
    } catch {
      setToastContext({ ...initialDangerToast, message: 'Updating settings failed' });
    }
  };

  return (
    <RootView>
      <TitleText>Modify settings</TitleText>
      <Formik initialValues={settingsContext.profile} onSubmit={handleSubmit}>
        {({ handleSubmit, setFieldValue, values, dirty }) => (
          <View style={{ marginTop: 12, flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 4 }}>
              <View style={{ flex: 4 }}>
                <ParagraphText>Display username</ParagraphText>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <ActionSwitch
                  value={values.shouldDisplayUsername}
                  onValueChange={(value: unknown) => setFieldValue('shouldDisplayUsername', value)}
                />
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {dirty && <ActionButton title="save" onPress={() => setConfirmModalVisible(true)} />}
              <View style={{ marginTop: 6 }}>
                <ActionButton title="log out" onPress={() => setLogoutModalVisible(true)} theme={Palette.Danger} />
              </View>
            </View>
            <ConfirmModal
              visible={confirmModalVisible}
              onSelected={(value: ConfirmModalOption) => {
                setConfirmModalVisible(false);
                switch (value) {
                  case ConfirmModalOption.Confirm:
                    handleSubmit();
                    break;
                }
                setConfirmModalVisible(false);
              }}
            />
          </View>
        )}
      </Formik>
      <ConfirmModal visible={logoutModalVisible} onSelected={handleLogout} />
    </RootView>
  );
};
