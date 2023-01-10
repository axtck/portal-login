import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { NotificationContainer } from '../../containers/NotificationContainer';
import { OptionsModal } from '../modals/generic/OptionsModal';

interface IRootViewProps {
  children: React.ReactNode;
}

export const RootView: FC<IRootViewProps> = (props) => {
  return (
    <View style={styles.container}>
      <NotificationContainer />
      <OptionsModal />
      <View style={styles.scroll}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    position: 'absolute',
    top: 18,
    left: 12,
    right: 12,
    bottom: 12,
  },
});
