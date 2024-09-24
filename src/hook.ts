import * as React from 'react';

import { stylesheetSingleton } from './singleton';
import { useCurrentWindow } from './windowProvider';

/**
 * creates a style on demand
 */
type StyleSingletonHook = (
  /**
   * styles to create
   */
  styles: string,
  /**
   * indication that styles should be reapplied on change
   */
  isDynamic?: boolean
) => void;

/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */
export const styleHookSingleton = (): StyleSingletonHook => {
  const sheet = stylesheetSingleton();

  return (styles, isDynamic) => {
    const currentWindow = useCurrentWindow();

    React.useEffect(() => {
      sheet.add(styles, currentWindow);

      return () => {
        sheet.remove(currentWindow);
      };
    }, [styles && isDynamic]);
  };
};
