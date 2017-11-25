import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestEditPost } from '../../modules/post';

import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

class PostEdit extends PureComponent {
  state = {
    title: this.props.post.post.title,
    body: this.props.post.post.body,
  };

  handleChange = ({ name, value }) =>
    this.setState({
      [name]: value,
    });

  handleEditPost = (event) => {
    event.preventDefault();
    
    const { title, body } = this.state;

    this.props.actions.requestEditPost({
      postId: this.props.id,
      title,
      body,
    });

    return this.props.onClose()
  };

  render() {
    const { title, body } = this.state;
    const {
      show,
      onClose,
    } = this.props;

    return (
      <Modal
        show={show}
        onClose={onClose}
      >
        <form onSubmit={this.handleEditPost}>
          <Input
            name="title"
            label="Title"
            value={title}
            onChange={this.handleChange}
            {...styles.input}
          />

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

const mapStateToProps = ({ post }) => ({
  post,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestEditPost: post => dispatch(requestEditPost(post)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
