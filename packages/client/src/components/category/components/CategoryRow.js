import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Card from '../../common/Card';

class CategoryRow extends PureComponent {
  render() {
    const { name, goToCategory } = this.props;

    return (
      <Card
        {...styles.container}
        onClick={goToCategory}
      >
        <span {...styles.name}>{name}</span>
      </Card>
    );
  }
}

const styles = {
  container: css({
    textAlign: 'center',
    cursor: 'pointer',
  }),
};

export default CategoryRow;
