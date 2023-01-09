import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Palette } from '../../types/enums/Color';
import { paletteToHexTextColor } from '../../utils/color-utils';

interface IParagraphTextProps extends TextProps {
  color?: Palette;
}

export const ParagraphText: FC<IParagraphTextProps> = (props) => {
  return (
    <Text style={{ ...styles.text, color: paletteToHexTextColor(props.color ?? Palette.Primary) }} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 22,
  },
});
