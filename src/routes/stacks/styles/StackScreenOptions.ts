import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Palette } from '../../../types/enums/Color';
import { paletteToHexColor } from '../../../utils/color-utils';

export const stackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: paletteToHexColor(Palette.Primary),
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
