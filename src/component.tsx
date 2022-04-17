import * as React from 'react';

import { styleHookSingleton } from './hook';

type Props = { styles: string };

export const styleSingleton = () => {
  const useStyle = styleHookSingleton();

  const Sheet: React.FC<Props> = ({ styles }) => {
    useStyle(styles);

    return null;
  };

  return Sheet;
};
