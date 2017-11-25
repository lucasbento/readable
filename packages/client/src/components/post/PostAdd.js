import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestAddPost } from '../../modules/post';
import { requestGetCategories } from '../../modules/category';

import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

class PostAdd extends PureComponent {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
  };

  componentWillMount() {
    this.props.actions.requestGetCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.category.categories.length &&
      nextProps.category.categories !== this.props.category.categories &&
      !this.state.category
    ) {
      return this.setState({
        category: nextProps.category.categories[0].name,
      });
    }
  }

  handleChange = ({ name, value }) =>
    this.setState({
      [name]: value,
    });

  handleAddPost = (event) => {
    event.preventDefault();
    
    const {
      title,
      body,
      author,
      category,
    } = this.state;

    this.props.actions.requestAddPost({
      postId: this.props.id,
      title,
      body,
      author,
      category: category,
    });

    return this.props.onClose()
  };

  render() {
    const {
      title,
      body,
      author,
      category,
    } = this.state;
    const { show, onClose } = this.props;

    return (
      <Modal
        show={show}
        onClose={onClose}
      >
        <form onSubmit={this.handleAddPost}>
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

          <Input
            name="author"
            label="Author"
            value={author}
            onChange={this.handleChange}
            {...styles.input}
          />

          <Select
            name="category"
            label="Category"
            options={this.props.category.categories.map(({ name }) => ({
              value: name,
              label: name,
            }))}
            value={category}
            onChange={this.handleChange}
            {...styles.select}
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

const mapStateToProps = ({ post, category }) => ({
  post,
  category,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestAddPost: post => dispatch(requestAddPost(post)),
    requestGetCategories: () => dispatch(requestGetCategories()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd);
