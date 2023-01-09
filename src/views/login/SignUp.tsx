import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import React, { FC, useContext } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';
import { axiosInstance } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { ValidatedInput } from '../../components/inputs/ValidatedInput';
import { CaptionText } from '../../components/text/CaptionText';
import { TitleText } from '../../components/text/TitleText';
import {
  AppContext,
  IAppContext,
  initialDangerNotification,
  initialSuccessNotification,
} from '../../context/AppContext';
import { AppRoute } from '../../routes/types/AppRoute';
import { RootStackNavigationProp } from '../../routes/types/RootStackParamList';
import { RootView } from '../core/RootView';

interface ISignUpProps {}

interface ISignupUser {
  email: string;
  username: string;
  password: string;
}

const initialValue: ISignupUser = {
  email: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const SignUp: FC<ISignUpProps> = () => {
  const { setNotificationContext } = useContext<IAppContext>(AppContext);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSubmit = async (formValues: ISignupUser): Promise<void> => {
    try {
      await axiosInstance.post('/users', formValues);
      setNotificationContext({ ...initialSuccessNotification, message: 'Successfully signed up' });
      navigation.navigate(AppRoute.LoginStack);
    } catch (e: unknown) {
      const axiosError = e as AxiosError;
      setNotificationContext({ ...initialDangerNotification, message: axiosError?.message });
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate(AppRoute.LoginStack);
  };

  return (
    <RootView>
      <TitleText>Sign up</TitleText>
      <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, isSubmitting }) => (
          <View>
            <ValidatedInput
              placeholder="Email"
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
            />
            <ValidatedInput
              placeholder="Username"
              label="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={errors.username}
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
              Already have an account?{' '}
              {
                <CaptionText style={{ color: 'blue' }} onPress={handleNavigateToLogin}>
                  Log in
                </CaptionText>
              }
            </CaptionText>
            <ActionButton title="sign up" onPress={handleSubmit} disabled={!isValid} loading={isSubmitting} />
          </View>
        )}
      </Formik>
    </RootView>
  );
};
