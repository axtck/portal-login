import { Palette, Theme } from '../types/enums/Color';

export const paletteToHexColor = (color: Palette): string => {
  switch (color) {
    case Palette.Primary:
      return '#1976d2';
    case Palette.Secondary:
      return '#aaaaaa';
    case Palette.Info:
      return '#2196f3';
    case Palette.Success:
      return '#4caf50';
    case Palette.Danger:
      return '#ff5252';
    case Palette.Warning:
      return '#ffc107';
  }
};

export const themeToHexColor = (color: Theme): string => {
  switch (color) {
    case Theme.Dark:
      return '#212529';
    case Theme.Light:
      return '#495057';
  }
};
