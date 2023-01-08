import React, { FunctionComponent } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData } from 'react-native';
import { Palette, Theme } from '../../types/enums/Color';
import { paletteToHexColor, themeToHexColor } from '../../utils/color-utils';

interface ILabeledInputProps {
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  placeholder?: string;
  label?: string;
}

export const LabeledInput: FunctionComponent<ILabeledInputProps> = ({
  onChangeText,
  onBlur,
  value,
  placeholder,
  label,
}) => {
  return (
    <React.Fragment>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        style={styles.input}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  label: {
    color: themeToHexColor(Theme.Light),
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    borderColor: paletteToHexColor(Palette.Secondary),
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 4,
    paddingVertical: 10,
  },
});
