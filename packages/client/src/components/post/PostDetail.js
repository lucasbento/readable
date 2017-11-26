import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import {
  requestGetPost,
  requestPostVote,
  requestDeletePost,
} from '../../modules/post';

import PostEdit from './PostEdit';
import CommentList from '../comment/CommentList';

import VoteHandler from '../common/VoteHandler';
import CommentCount from './components/CommentCount';
import Loading from '../common/Loading';
import Card from '../common/Card';
import Button from '../common/Button';

class PostDetail extends PureComponent {
  state = {
    showEditModal: (
      this.props.history.location.state ?
        this.props.history.location.state.shouldShowEdit :
        false
    ),
  };

  componentWillMount() {
    this.props.actions.requestGetPost(this.props.match.params.id);
  }

  toggleEditModal = () =>
    this.setState(({ showEditModal }) => ({
      showEditModal: !showEditModal,
    }));

  handleDeletePost = () => {
    if (window.confirm('Are you sure that you want to delete this post?')) {
      this.props.actions.requestDeletePost(this.props.post.post.id);

      return this.props.history.push('/');
    }
  };

  render() {
    const { showEditModal } = this.state;
    const {
      isFetching,
      post: {
        id,
        title,
        body,
        author,
        commentCount,
        voteScore,
      },
    } = this.props.post;

    if (isFetching) {
      return (
        <Loading />
      );
    }

    if (!id) {
      return (
        <Card
          fullScreen={true}
          {...styles.container}
        >
          <h1 {...styles.notFoundText}>Post not found!</h1>
        </Card>
      );
    }

    return (
      <Card
        fullScreen={true}
        {...styles.container}
      >
        <div {...styles.headerContainer}>
          <h1 {...styles.title}>{title}</h1>

          <div {...styles.headerActions}>
            <Button
              icon="mode_edit"
              style={styles.headerButton}
              iconStyle={styles.headerButtonIcon}
              onClick={this.toggleEditModal}
            />

            <Button
              icon="delete"
              style={styles.headerButton}
              iconStyle={styles.headerButtonIcon}
              onClick={this.handleDeletePost}
            />
          </div>
        </div>

        <div {...styles.bodyContainer}>
          <span {...styles.body}>{body}</span>
        </div>

        <div {...styles.bottomBarContainer}>
          <VoteHandler
            id={id}
            score={voteScore}
            containerStyle={styles.voteHandlerContainer}
          />

          <div {...styles.bottomBarInnerContainer}>
            <span>{author}</span>

            <span {...styles.separator}>·</span>
          
            <CommentCount value={commentCount} />
          </div>
        </div>

        <PostEdit
          id={id}
          show={showEditModal}
          onClose={this.toggleEditModal}
        />

        <CommentList postId={id} />
      </Card>
    );
  }
}

const styles = {
  container: css({
    margin: '30px 20%',
    padding: 20,
  }),
  notFoundText: css({
    textAlign: 'center',
    fontWeight: 'normal',
  }),
  headerContainer: css({
    display: 'flex',
    flexDirection: 'row',
    margin: '0px 0px 10px 0px',
  }),
  title: css({
    flex: 1,
    textAlign: 'center',
  }),
  headerActions: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  headerButton: css({
    borderRadius: 0,
  }),
  headerButtonIcon: css({
    fontSize: 30,
  }),
  bodyContainer: css({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  }),
  body: css({
    fontSize: 19,
  }),
  bottomBarContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  }),
  voteHandlerContainer: css({
    display: 'initial',
    flex: 0,
  }),
  separator: css({
    margin: '0px 10px',
  }),
  bottomBarInnerContainer: css({
    display: 'flex',
    flex: 1,
    fontSize: 17,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
};

const mapStateToProps = ({ post }) => ({
  post,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestGetPost: postId => dispatch(requestGetPost(postId)),
    requestPostVote: postId => dispatch(requestPostVote(postId)),
    requestDeletePost: postId => dispatch(requestDeletePost(postId)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
