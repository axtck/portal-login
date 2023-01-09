import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Palette } from '../../types/enums/Color';
import { paletteToHexColor } from '../../utils/color-utils';

interface IActionButtonProps {
  title: string;
  onPress: () => void;
  theme?: Palette;
  disabled?: boolean;
  loading?: boolean;
}

export const ActionButton: React.FC<IActionButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: paletteToHexColor(props.theme ?? Palette.Primary),
        opacity: props.disabled ? 0.6 : 1,
      }}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.buttonText}>{props.title.toUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    paddingHorizontal: 8,
    color: 'white',
    letterSpacing: 4,
    fontSize: 16,
    fontFamily: 'Inter-Black',
  },
});
