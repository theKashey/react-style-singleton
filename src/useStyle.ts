import * as React from 'react';
import {stylesheetSinglentone} from "./singlentone";

export const getUseStyle = () => {
  const sheet = stylesheetSinglentone();
  return (styles: string) => {
    React.useEffect(() => {
      sheet.add(styles);
      return () => {
        sheet.remove();
      }
    }, [])
  }
};
