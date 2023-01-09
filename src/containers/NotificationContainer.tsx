import React, { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext, IAppContext, initialDangerNotification } from '../context/AppContext';
import { paletteToHexColor } from '../utils/color-utils';

interface INotificationContainerProps {}

export const NotificationContainer: FC<INotificationContainerProps> = () => {
  const { notificationContext, setNotificationContext } = useContext<IAppContext>(AppContext);
  // const translation = useRef(new Animated.Value(-20)).current;

  // useEffect(() => {
  //   // TODO: why are animations not working?
  //   Animated.timing(translation, {
  //     toValue: 0,
  //     easing: Easing.linear,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }, []);

  useEffect(() => {
    if (notificationContext.message) {
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
        // <Animated.View
        //   style={{
        //     backgroundColor: paletteToHexColor(notificationContext.theme),
        //     height: 20,
        //     transform: [{ translateY: translation }],
        //   }}
        // >
        //   <Text style={styles.notificationMessage}>{notificationContext.message}</Text>
        // </Animated.View>
        <View
          style={{
            backgroundColor: paletteToHexColor(notificationContext.theme),
            height: 20,
          }}
        >
          <Text style={styles.notificationMessage}>{notificationContext.message}</Text>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  notificationMessage: {
    color: 'white',
  },
});
