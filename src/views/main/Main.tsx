import React, { FunctionComponent } from 'react';
import { TitleText } from '../../components/text/TitleText';
import { RootView } from '../core/RootView';

interface IMainProps {}

export const Main: FunctionComponent<IMainProps> = () => {
  return (
    <RootView>
      <TitleText>Main</TitleText>
    </RootView>
  );
};
