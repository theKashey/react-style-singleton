import { createContext, ReactNode, useContext } from 'react';
import * as React from 'react';

export interface WindowContextValue {
  window: Window;
}

export const WindowContext = createContext<WindowContextValue>({
  window: window,
});

export function useCurrentWindow(): Window {
  const context = useContext(WindowContext);

  return context.window;
}

export interface WindowProviderProps {
  window: Window;
  children: ReactNode;
}

export function WindowProvider({ window, children }: WindowProviderProps): JSX.Element {
  return <WindowContext.Provider value={{ window }}>{children}</WindowContext.Provider>;
}
