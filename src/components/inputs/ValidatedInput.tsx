import React, { FC } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData } from 'react-native';
import { Palette } from '../../types/enums/Color';
import { paletteToHexColor } from '../../utils/color-utils';
import { CaptionText } from '../text/CaptionText';

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
      {props.label && <CaptionText>{props.label}</CaptionText>}
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
    marginBottom: 8,
  },
});
