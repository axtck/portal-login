import { AxiosError } from 'axios';
import { Formik } from 'formik';
import React, { FC, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import { axiosInstance } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { ValidatedInput } from '../../components/inputs/ValidatedInput';
import { NotificationContainer } from '../../containers/NotificationContainer';
import {
  AppContext,
  IApp,
  IAppContext,
  initialDangerNotification,
  initialSuccessNotification,
} from '../../context/AppContext';
import { Palette } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { Id } from '../../types/types';
import { storeObject, storeString } from '../../utils/storage-utils';

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
  const { appContext, setAppContext, setNotificationContext } = useContext<IAppContext>(AppContext);

  const handleSubmit = async (formValues: ILoginUser): Promise<void> => {
    try {
      const response = await axiosInstance.post<{ userId: Id; token: string }>('/auth/login', formValues);
      await storeString(StorageKey.LoginToken, response.data.token);

      const updatedContext: IApp = { ...appContext, userId: response.data.userId, isLoggedIn: true };
      setAppContext(updatedContext);
      await storeObject<IApp>(StorageKey.AppContext, updatedContext);
      setNotificationContext({ ...initialSuccessNotification, message: 'Successfully logged in' });
    } catch (e: unknown) {
      const axiosError = e as AxiosError;
      setNotificationContext({ ...initialDangerNotification, message: `${axiosError?.response?.status ?? ''}` });
    }
  };
  return (
    <ScrollView>
      <NotificationContainer />
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
            <ActionButton title="submit" onPress={handleSubmit} disabled={!isValid} loading={isSubmitting} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
