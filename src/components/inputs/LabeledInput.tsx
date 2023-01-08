import React, { FC } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData } from 'react-native';
import { Palette, Theme } from '../../types/enums/Color';
import { paletteToHexColor, themeToHexColor } from '../../utils/color-utils';

interface ILabeledInputProps {
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
}

export const LabeledInput: FC<ILabeledInputProps> = (props) => {
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
