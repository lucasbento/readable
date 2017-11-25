import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestAddComment } from '../../modules/comment';

import Modal from '../common/Modal';
import Loading from '../common/Loading';
import Input from '../common/Input';
import Button from '../common/Button';

class CommentAdd extends PureComponent {
  state = {
    body: '',
    author: '',
  }

  handleChange = ({ name, value }) =>
    this.setState({
      [name]: value,
    });

  handleAddComment = (event) => {
    event.preventDefault();

    const { body, author } = this.state;

    this.props.actions.requestAddComment({
      parentId: this.props.postId,
      body,
      author,
    });

    return this.props.onClose()
  };

  render() {
    const { body, author } = this.state;
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
          <form onSubmit={this.handleAddComment}>
            <Input
              name="body"
              label="Body"
              value={body}
              onChange={this.handleChange}
              {...styles.input}
            />

            <Input
              name="author"
              label="Author"
              value={author}
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
    requestAddComment: comment => dispatch(requestAddComment(comment)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdd);
