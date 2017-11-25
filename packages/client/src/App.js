import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Router from './Router';

css.global('html, body', {
  margin: 0,
});

class App extends PureComponent {
  render() {
    return (
      <Router />
    );
  }
}

export default App;
