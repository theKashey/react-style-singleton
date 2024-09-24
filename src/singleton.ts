import { getNonce } from 'get-nonce';

type NullableStyle = HTMLStyleElement | null;

function makeStyleTag(currentDocument: Document): NullableStyle {
  if (!currentDocument) return null;

  const tag = currentDocument.createElement('style');
  tag.type = 'text/css';

  const nonce = getNonce();

  if (nonce) {
    tag.setAttribute('nonce', nonce);
  }

  return tag;
}

function injectStyles(tag: HTMLStyleElement, css: string) {
  // @ts-ignore
  if (tag.styleSheet) {
    // @ts-ignore
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(tag.ownerDocument.createTextNode(css));
  }
}

function insertStyleTag(tag: HTMLStyleElement): void {
  const head = tag.ownerDocument.head || tag.ownerDocument.getElementsByTagName('head')[0];
  head.appendChild(tag);
}

export const stylesheetSingleton = (): {
  add: (style: string, currentWindow: Window) => void;
  remove: (currentWindow: Window) => void;
} => {
  const windowMap = new Map<Window, { counter: number; stylesheet: NullableStyle }>();

  function getOrCreateEntry(currentWindow: Window) {
    let entry = windowMap.get(currentWindow);

    if (entry === undefined) {
      entry = { counter: 0, stylesheet: null };
      windowMap.set(currentWindow, entry);
    }

    return entry;
  }

  return {
    add: (style, currentWindow: Window) => {
      const entry = getOrCreateEntry(currentWindow);
      const currentDocument = currentWindow.document;

      if (entry.counter == 0) {
        if ((entry.stylesheet = makeStyleTag(currentDocument))) {
          injectStyles(entry.stylesheet, style);
          insertStyleTag(entry.stylesheet);
        }
      }

      entry.counter++;
    },
    remove: (currentWindow: Window) => {
      const entry = getOrCreateEntry(currentWindow);

      entry.counter--;

      if (!entry.counter && entry.stylesheet) {
        entry.stylesheet.parentNode && entry.stylesheet.parentNode.removeChild(entry.stylesheet);
        entry.stylesheet = null;
        windowMap.delete(currentWindow);
      }
    },
  };
};
