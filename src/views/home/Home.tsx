import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NotificationContainer } from '../../containers/NotificationContainer';

interface IHomeProps {}

export const Home: FC<IHomeProps> = () => {
  return (
    <ScrollView>
      <NotificationContainer />
    </ScrollView>
  );
};
