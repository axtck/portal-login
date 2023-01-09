import React, { FunctionComponent, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { ActionButton } from '../../components/buttons/ActionButton';
import { NotificationContainer } from '../../containers/NotificationContainer';
import { AppContext, IAppContext } from '../../context/AppContext';

interface IMainProps {}

export const Main: FunctionComponent<IMainProps> = () => {
  const { notificationContext, setNotificationContext } = useContext<IAppContext>(AppContext);

  return (
    <ScrollView>
      <NotificationContainer />
      <Text>main</Text>
    </ScrollView>
  );
};
