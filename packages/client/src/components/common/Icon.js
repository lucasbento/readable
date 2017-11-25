import React, { PureComponent } from 'react';
import { css } from 'glamor';

class Icon extends PureComponent {
  render() {
    const { name, ...props } = this.props;

    return (
      <i
        {...styles.icon}
        {...props}
        className="material-icons"
      >
        {name}
      </i>
    );
  }
}

const styles = {
  icon: css({
    fontSize: 35,
  }),
};

export default Icon;
