import React, { FC } from 'react';
import { View } from 'react-native';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { instance } from '../../api/axios';
import { ActionButton } from '../../components/buttons/ActionButton';
import { ValidatedInput } from '../../components/inputs/ValidatedInput';
import { IAppContext } from '../../context/AppContext';
import { Theme } from '../../types/enums/Color';
import { StorageKey } from '../../types/enums/StorageKey';
import { getStoredObject, storeObject, storeString } from '../../utils/storage-utils';

interface ILoginProps {}

interface ILoginUser {
  email: string;
  password: string;
}

const initialValue: ILoginUser = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  // email: Yup.string().email('Invalid email').required('Email is required'),
  //password: Yup.string().required('Password is required'),
});
export const Login: FC<ILoginProps> = () => {
  const handleSubmit = async (values: ILoginUser): Promise<void> => {
    try {
      const response = await instance.post<string>('/auth/login', {
        username: values.email,
        password: values.password,
      });
      await storeString(StorageKey.LoginToken, response.data);
      const currentContext = await getStoredObject<IAppContext>(StorageKey.AppContext);
      await storeObject<IAppContext>(StorageKey.AppContext, {
        theme: currentContext?.theme ?? Theme.Dark,
        isLoggedIn: true,
      });
    } catch (e: unknown) {
      const axiosError = e as AxiosError;
      console.log(axiosError?.response?.status);
    }
  };
  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
        <View>
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
              placeholder="Password"
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
            />
            <ActionButton title="submit" onPress={handleSubmit} disabled={!isValid} />
          </View>
        </View>
      )}
    </Formik>
  );
};
