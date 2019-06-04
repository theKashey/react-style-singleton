import * as React from 'react';
import {styleSingleton} from "../src";

const Style = styleSingleton();

const App = () => {

  const [on, setOn] = React.useState(true);
  const click = React.useCallback(() => setOn(!on), [on]);
  return (
    <div>
      {on &&
      <Style styles={`
          span { color: red; }
        `}/>
      }
      <span onClick={click}>TEST {on ? 'RED' : 'GREEN'}</span>
    </div>
  )
};

export default () => (
  <div>
    <App/>
    <App/>
    <App/>
  </div>
)