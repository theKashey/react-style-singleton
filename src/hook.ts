import * as React from 'react';
import {stylesheetSingleton} from './singleton';

export const styleHookSingleton = (styles) => {
  const sheet = stylesheetSingleton(styles);
  return (styles: string) => {
    React.useEffect(() => {
      sheet.add();
      return () => sheet.remove();
    }, [])
  }
};
