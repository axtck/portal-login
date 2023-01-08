import React, { FC } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData } from 'react-native';
import { Palette, Theme } from '../../types/enums/Color';
import { paletteToHexColor, themeToHexColor } from '../../utils/color-utils';

interface IValidatedInputProps {
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  placeholder: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
}

export const ValidatedInput: FC<IValidatedInputProps> = (props) => {
  return (
    <React.Fragment>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        style={styles.input}
      />
      <Text style={styles.errorText}>{props.error}</Text>
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
  errorText: {
    color: paletteToHexColor(Palette.Danger),
    fontSize: 12,
    marginLeft: 2,
  },
});
