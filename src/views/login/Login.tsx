import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { FC, useContext } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';
import { api } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { ValidatedInput } from '../../components/inputs/ValidatedInput';
import { CaptionText } from '../../components/text/CaptionText';
import { TitleText } from '../../components/text/TitleText';
import { AppContext, IApp, IAppContext } from '../../context/AppContext';
import { initialDangerToast, initialSuccessToast, IToastContext, ToastContext } from '../../context/ToastContext';
import { AppRoute } from '../../routes/types/AppRoute';
import { RootStackNavigationProp } from '../../routes/types/RootStackParamList';
import { StorageKey } from '../../types/enums/StorageKey';
import { Id } from '../../types/types';
import { storeObject, storeString } from '../../utils/storage-utils';
import { RootView } from '../core/RootView';

interface ILoginProps {}

interface ILoginUser {
  identifier: string;
  password: string;
}

const initialValue: ILoginUser = {
  identifier: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required('Email/Username is required'),
  password: Yup.string().required('Password is required'),
});

export const Login: FC<ILoginProps> = () => {
  const { appContext, setAppContext } = useContext<IAppContext>(AppContext);
  const { setToastContext } = useContext<IToastContext>(ToastContext);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSubmit = async (formValues: ILoginUser): Promise<void> => {
    try {
      const response = await api.post<{ userId: Id; token: string }>('/auth/login', formValues);
      await storeString(StorageKey.LoginToken, response.data.token);

      const updatedContext: IApp = { ...appContext, userId: response.data.userId, isLoggedIn: true };
      setAppContext(updatedContext);
      await storeObject<IApp>(StorageKey.AppContext, updatedContext);
      setToastContext({ ...initialSuccessToast, message: 'Successfully logged in' });
    } catch {
      setToastContext({ ...initialDangerToast, message: `Loggin in failed` });
    }
  };

  const handleNavigateToSignup = () => {
    navigation.navigate(AppRoute.SignupScreen);
  };

  return (
    <RootView>
      <TitleText>Login</TitleText>
      <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, isSubmitting }) => (
          <View>
            <ValidatedInput
              placeholder="Email/Username"
              label="Email/Username"
              value={values.identifier}
              onChangeText={handleChange('identifier')}
              onBlur={handleBlur('identifier')}
              error={errors.identifier}
            />
            <ValidatedInput
              placeholder="Password"
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
            />
            <CaptionText style={{ marginBottom: 16, alignSelf: 'center' }}>
              Don't have an account?{' '}
              {
                <CaptionText style={{ color: 'blue' }} onPress={handleNavigateToSignup}>
                  Sign up
                </CaptionText>
              }
            </CaptionText>
            <ActionButton title="login" onPress={handleSubmit} disabled={!isValid} loading={isSubmitting} />
          </View>
        )}
      </Formik>
    </RootView>
  );
};
