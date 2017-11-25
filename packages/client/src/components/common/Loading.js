import React, { PureComponent } from 'react';
import { css } from 'glamor';

class Loading extends PureComponent {
  render() {
    return (
      <div {...styles.container}>
        <img
          src="./loading.svg"
          width="84"
          height="84"
          alt="Loading"
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  }),
};

export default Loading;
