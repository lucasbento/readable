import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestGetPosts, requestDeletePost } from '../../modules/post';

import PostAdd from './PostAdd';
import PostRow from './components/PostRow';

import Button from '../common/Button';
import Loading from '../common/Loading';

class PostList extends PureComponent {
  state = {
    showAddModal: false,
  };

  componentWillMount() {
    if (this.props.match.params.category) {
      return this.props.actions.requestGetPosts(this.props.match.params.category);
    }

    return this.props.actions.requestGetPosts();
  }

  goToPostDetail = ({ category, id }) => () =>
    this.props.history.push(`/${category}/${id}`);
  
  toggleAddModal = () =>
    this.setState(({ showAddModal }) => ({
      showAddModal: !showAddModal,
    }));

  handleActionClick = (type) => (id) => {
    if (type === 'edit') {
      return this.props.history.push(`/posts/${id}`, {
        shouldShowEdit: true,
      });
    }

    if (window.confirm('Are you sure that you want to delete this post?')) {
      return this.props.actions.requestDeletePost(id);
    }
  };

  render() {
    const { showAddModal } = this.state;
    const { isFetching, posts } = this.props.post;

    if (isFetching) {
      return (
        <Loading />
      );
    }

    if (!isFetching && !posts.length) {
      return (
        <div {...styles.container}>
          <h1 {...styles.noPostsText}>No posts found!</h1>

          <PostAdd
            show={showAddModal}
            onClose={this.toggleAddModal}
          />

          <Button
            styleType="float"
            icon="add"
            style={styles.button}
            onClick={this.toggleAddModal}
          />
        </div>
      );
    }

    return (
      <div {...styles.container}>
        {posts.map(post => (
          <PostRow
            key={post.id}
            onClick={this.goToPostDetail(post)}
            onClickEdit={this.handleActionClick('edit')}
            onClickDelete={this.handleActionClick('delete')}
            {...post}
          />
        ))}

        <PostAdd
          show={showAddModal}
          onClose={this.toggleAddModal}
        />

        <Button
          styleType="float"
          icon="add"
          style={styles.button}
          onClick={this.toggleAddModal}
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),
  noPostsText: css({
    fontFamily: 'Open Sans',
    fontWeight: 'initial',
  }),
  button: css({
    backgroundColor: '#6BABE8',
    color: 'white',
  }),
};

const mapStateToProps = ({ post }) => ({
  post,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestGetPosts: categoryPath => dispatch(requestGetPosts(categoryPath)),
    requestDeletePost: postId => dispatch(requestDeletePost(postId)),    
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
