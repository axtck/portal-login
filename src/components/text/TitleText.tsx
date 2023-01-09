import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface ITitleTextProps {
  children: React.ReactNode;
}

export const TitleText: FC<ITitleTextProps> = (props) => {
  return (
    <Text style={styles.text} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Black',
    fontSize: 28,
  },
});
