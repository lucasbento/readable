import React, { PureComponent } from 'react';
import { css } from 'glamor';

import PostList from './post/PostList';
import CategoryList from './category/CategoryList';

// <div key="separator" {...styles.separator} />,
class Main extends PureComponent {
  render() {
    return (
      <div>
        <PostList {...this.props} />

        <CategoryList
          {...this.props}
          style={styles.category}
        />
      </div>
    )
  }
}

const styles = {
  category: css({
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    borderTopStyle: 'solid',
    marginTop: 40,
    paddingTop: 35,
  }),
};

export default Main;
