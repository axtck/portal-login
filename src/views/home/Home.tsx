import React, { FC } from 'react';
import { TitleText } from '../../components/text/TitleText';
import { RootView } from '../core/RootView';

interface IHomeProps {}

export const Home: FC<IHomeProps> = () => {
  return (
    <RootView>
      <TitleText>Home</TitleText>
    </RootView>
  );
};
