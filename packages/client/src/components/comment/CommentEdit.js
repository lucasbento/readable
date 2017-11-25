import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestGetComment, requestEditComment } from '../../modules/comment';

import Modal from '../common/Modal';
import Loading from '../common/Loading';
import Input from '../common/Input';
import Button from '../common/Button';

class CommentEdit extends PureComponent {
  state = {
    body: null,
  }
  
  componentWillMount() {
    if (this.props.id) {
      return this.props.actions.requestGetComment(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id && nextProps.id) {
      return this.props.actions.requestGetComment(nextProps.id);
    }

    if (nextProps.comment.comment.body && nextProps.comment.comment.body !== this.props.comment.comment.body) {
      return this.setState({
        body: nextProps.comment.comment.body,
      });
    }
  }

  handleChange = ({ name, value }) =>
    this.setState({
      [name]: value,
    });

  handleEditComment = (event) => {
    event.preventDefault();

    this.props.actions.requestEditComment({
      commentId: this.props.id,
      body: this.state.body,
    });

    return this.props.onClose()
  };

  render() {
    const { body } = this.state;
    const {
      show,
      onClose,
      comment: {
        isFetching,
      },
    } = this.props;

    return (
      <Modal
        show={show}
        onClose={onClose}
      >
        {isFetching ? (
          <Loading />
        ) : (
          <form onSubmit={this.handleEditComment}>
            <Input
              name="body"
              label="Body"
              value={body}
              onChange={this.handleChange}
              {...styles.input}
            />

            <div {...styles.actionsContainer}>
              <Button
                type="submit"
                label="Save"
                style={styles.button}
              />
            </div>
          </form>
        )}
      </Modal>
    );
  }
}

const styles = {
  input: css({
    fontSize: 17,
    width: 500,
    padding: 10,
  }),
  actionsContainer: css({
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#CCC',
    paddingTop: 15,
  }),
  button: css({
    width: 100,
    height: 45,
  }),
};

const mapStateToProps = ({ comment }) => ({
  comment,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestGetComment: commentId => dispatch(requestGetComment(commentId)),
    requestEditComment: comment => dispatch(requestEditComment(comment)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
