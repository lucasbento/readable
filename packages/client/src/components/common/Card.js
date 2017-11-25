import React, { PureComponent } from 'react';
import { css } from 'glamor';

class Card extends PureComponent {
  render() {
    const {
      fullScreen,
      children,
      ...props,
    } = this.props;

    if (fullScreen) {
      return (
        <div
          {...styles.container}
          {...styles.fullScreenContainer}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        {...styles.container}
        {...props}
      >
        {children}
      </div>
    );
  }
}

const styles = {
  container: css({
    boxShadow: '2px 14px 38px -21px rgba(0,0,0,0.75)',
    padding: 20,
    width: 300,
    fontFamily: 'Open Sans',
  }),
  fullScreenContainer: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: 'initial',
    margin: 15,
  }),
};

export default Card;
