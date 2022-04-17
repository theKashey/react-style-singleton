import * as React from 'react';

import { stylesheetSingleton } from './singleton';

export const styleHookSingleton = () => {
  const sheet = stylesheetSingleton();

  return (styles: string) => {
    React.useEffect(() => {
      sheet.add(styles);

      return () => {
        sheet.remove();
      };
    }, [styles]);
  };
};
