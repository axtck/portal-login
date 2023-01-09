import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Palette } from '../../types/enums/Color';
import { paletteToHexTextColor } from '../../utils/color-utils';

interface ITitleTextProps {
  children: React.ReactNode;
  color?: Palette;
}

export const TitleText: FC<ITitleTextProps> = (props) => {
  return (
    <Text style={{ ...styles.text, color: paletteToHexTextColor(props.color ?? Palette.Primary) }} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 28,
    marginBottom: 6,
  },
});
