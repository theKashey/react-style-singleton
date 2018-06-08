import * as React from 'react';
import {stylesheetSinglentone} from "./singlentone";

type Props = { styles: string };

export const styleSinglentone = () => {

  const sheet = stylesheetSinglentone();

  return class Sheet extends React.PureComponent<Props> {
    componentDidMount() {
      sheet.add(this.props.styles);
    }

    componentWillUnmount() {
      sheet.remove();
    }

    render():null {
      return null;
    }
  }
};
