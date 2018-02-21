import React, { Component} from 'react';
import PropTypes from 'prop-types';

// Styles
import '../css/App.less';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    return (
      <div className="App">
        <h1>Hello, friend!</h1>
      </div>
    );
  }
}

export default App;
