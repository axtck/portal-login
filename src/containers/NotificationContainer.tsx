import React, { FC, useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { AppContext, IAppContext, initialDangerNotification } from '../context/AppContext';
import { paletteToHexColor } from '../utils/color-utils';

interface INotificationContainerProps {}

export const NotificationContainer: FC<INotificationContainerProps> = () => {
  const { notificationContext, setNotificationContext } = useContext<IAppContext>(AppContext);
  const translation = useRef(new Animated.Value(-20));

  useEffect(() => {
    if (notificationContext.message) {
      Animated.timing(translation.current, {
        toValue: 0,
        easing: Easing.linear,
        duration: notificationContext.duration / 6,
        useNativeDriver: true,
      }).start();

      translation.current = new Animated.Value(-20);

      const timeoutId = setTimeout(() => {
        setNotificationContext(initialDangerNotification);
      }, notificationContext.duration);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [notificationContext.message]);

  return (
    <React.Fragment>
      {notificationContext.message && (
        <Animated.View
          style={{
            backgroundColor: paletteToHexColor(notificationContext.theme),
            height: 20,
            transform: [{ translateY: translation.current }],
          }}
        >
          <Text style={styles.notificationMessage}>{notificationContext.message}</Text>
        </Animated.View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  notificationMessage: {
    color: 'white',
    alignSelf: 'center',
  },
});
