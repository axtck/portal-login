import React, { FC } from 'react';
import { View, Switch } from 'react-native';

interface IActionSwitchProps {
  value: boolean;
  onValueChange: (value: unknown) => void;
}

export const ActionSwitch: FC<IActionSwitchProps> = (props) => {
  return (
    <View>
      <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        trackColor={{ true: 'green', false: 'gray' }}
        thumbColor={props.value ? 'white' : 'gray'}
      />
    </View>
  );
};
