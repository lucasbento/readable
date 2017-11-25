import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestGetCategories } from '../../modules/category';

import CategoryRow from './components/CategoryRow';

import Loading from '../common/Loading';

class CategoryList extends PureComponent {
  componentWillMount() {
    this.props.actions.requestGetCategories(this.props.postId);
  }

  goToCategory = category => () =>
    this.props.history.push(`/${category}`);

  render() {
    const {
      style,
      category: {
        isFetching,
        categories,
      },
    } = this.props;
    
    if (isFetching) {
      return (
        <Loading />
      );
    }

    return (
      <div
        {...styles.container}
        {...style}
      >
        {categories.map(category => (
          <CategoryRow
            key={category.path}
            name={category.name}
            path={category.path}
            goToCategory={this.goToCategory(category.path)}
          />
        ))}
      </div>
    );
  }
}

const styles = {
  container: css({
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }),
};

const mapStateToProps = ({ category }) => ({
  category,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestGetCategories: () => dispatch(requestGetCategories()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
