import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import {
  requestGetComments,
  requestDeleteComment,
} from '../../modules/comment';

import CommentAdd from './CommentAdd';
import CommentEdit from './CommentEdit';
import CommentRow from './components/CommentRow';

import Button from '../common/Button';

class CommentList extends PureComponent {
  state = {
    showAddModal: false,
    showEditModalFor: null,
  };

  componentWillMount() {
    this.props.actions.requestGetComments(this.props.postId);
  }

  toggleAddModal = () =>
    this.setState(({ showAddModal }) => ({
      showAddModal: !showAddModal,
    }));

  toggleEditModal = (id = null) => () =>
    this.setState({
      showEditModalFor: id,
    });

  handleDeleteComment = (id) => () => {
    if (window.confirm('Are you sure that you want to delete this comment?')) {
      return this.props.actions.requestDeleteComment(id);
    }
  };

  render() {
    const { showAddModal, showEditModalFor } = this.state;
    const { comments } = this.props.comment;

    return (
      <div {...styles.container}>
        <div {...styles.headerContainer}>
          <Button
            label="Add comment"
            onClick={this.toggleAddModal}
            style={styles.button}
          />
        </div>

        <div {...styles.commentContainer}>
          {comments.map(comment => (
            <CommentRow
              key={comment.id}
              id={comment.id}
              body={comment.body}
              author={comment.author}
              voteScore={comment.voteScore}
              onClickEdit={this.toggleEditModal}
              onClickDelete={this.handleDeleteComment}
            />
          ))}
        </div>

        <CommentAdd
          postId={this.props.postId}
          show={showAddModal}
          onClose={this.toggleAddModal}
        />

        <CommentEdit
          id={showEditModalFor}
          show={!!showEditModalFor}
          onClose={this.toggleEditModal()}
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  }),
  headerContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  }),
  button: css({
    width: 'initial',
    height: 'initial',
    padding: 10,
    border: '1px solid #CCC',
  }),
  commentContainer: css({
    marginTop: 20,
  }),
};

const mapStateToProps = ({ comment }) => ({
  comment,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestGetComments: commentId => dispatch(requestGetComments(commentId)),
    requestDeleteComment: commentId => dispatch(requestDeleteComment(commentId)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
