import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IIconButtonProps {
  iconName: string;
  onPress: () => void;
}

export const IconButton: FC<IIconButtonProps> = (props) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={props.onPress}>
      <Ionicons name={props.iconName} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
