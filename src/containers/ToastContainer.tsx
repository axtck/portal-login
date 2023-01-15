import React, { FC, useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { initialDangerToast, IToastContext, ToastContext } from '../context/ToastContext';
import { paletteToHexColor } from '../utils/color-utils';

interface IToastContainerProps {}

export const ToastContainer: FC<IToastContainerProps> = () => {
  const { toastContext, setToastContext } = useContext<IToastContext>(ToastContext);
  const translation = useRef(new Animated.Value(-20));

  useEffect(() => {
    if (toastContext.message) {
      Animated.timing(translation.current, {
        toValue: 0,
        easing: Easing.linear,
        duration: toastContext.duration / 6,
        useNativeDriver: true,
      }).start();

      translation.current = new Animated.Value(-20);

      const timeoutId = setTimeout(() => {
        setToastContext(initialDangerToast);
      }, toastContext.duration);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [toastContext.message]);

  return (
    <React.Fragment>
      {toastContext.message && (
        <Animated.View
          style={{
            backgroundColor: paletteToHexColor(toastContext.theme),
            height: 20,
            transform: [{ translateY: translation.current }],
          }}
        >
          <Text style={styles.toastMessage}>{toastContext.message}</Text>
        </Animated.View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  toastMessage: {
    color: 'white',
    alignSelf: 'center',
  },
});
