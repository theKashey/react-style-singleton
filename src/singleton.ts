type NullableStyle = HTMLStyleElement | null;

function makeStyleTag(): NullableStyle {
  if (!document) return null;

  let tag = document.createElement('style');
  tag.type = 'text/css';

  return tag;
}

function injectStyles(tag: any, css:string) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}

function insertStyleTag(tag: HTMLStyleElement) {
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(tag);
}

export const stylesheetSingleton = (style: string): {
  add: () => void,
  remove: () => void,
} => {
  let counter = 0;
  let stylesheet: NullableStyle = null;
  return {
    add: style => {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: () => {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  }
};