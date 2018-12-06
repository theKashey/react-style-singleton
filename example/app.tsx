import * as React from 'react';
import {Component} from 'react';
import {styleSinglentone} from "../src";


const Style = styleSinglentone();

class App extends Component<{}, { on: boolean }> {

  state = {
    on: true
  }

  click = () => this.setState(({on}) => ({on: !on}));

  render() {
    return (
      <div>
        {this.state.on &&
        <Style styles={`
          span { color: red; }
        `}/>
        }
        <span onClick={this.click}>TEST {this.state.on ? 'RED' : 'GREEN'}</span>
      </div>
    )
  }
}

export default () => (
  <div>
    <App/>
    <App/>
    <App/>
  </div>
)