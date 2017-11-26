import React, { PureComponent } from 'react';

class CommentCount extends PureComponent {
  render() {
    const { value, ...props } = this.props;

    return (
      <span {...props}>
        {value === 1 ?
          '1 comment' :
          `${value || 0} comments`
        }
      </span>
    );
  }
}

export default CommentCount;
