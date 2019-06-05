import * as React from 'react';
import {styleHookSingleton} from './hook';

type Props = {};

export const styleSingleton = (styles: string) => {
  const useStyle = styleHookSingleton(styles);

  const Sheet: React.FC<Props> = () => {
    useStyle();
    return null;
  };

  return Sheet;
};
