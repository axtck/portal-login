import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Palette } from '../../types/enums/Color';
import { paletteToHexTextColor } from '../../utils/color-utils';

interface ICaptionTextProps extends TextProps {
  color?: Palette;
}

export const CaptionText: FC<ICaptionTextProps> = (props) => {
  return (
    <Text style={{ ...styles.text, color: paletteToHexTextColor(props.color ?? Palette.Secondary) }} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
