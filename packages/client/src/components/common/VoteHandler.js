import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { requestPostVote } from '../../modules/post';
import { requestCommentVote } from '../../modules/comment';

import Button from './Button';

class VoteHandler extends PureComponent {
  handlePostVote = (voteType) => () => {
    if (this.props.type === 'comment') {
      return this.props.actions.requestCommentVote({
        type: voteType,
        commentId: this.props.id,
      });
    }

    return this.props.actions.requestPostVote({
      type: voteType,
      postId: this.props.id,
    });
  };

  render() {
    const {
      styleType = 'default',
      score,
      containerStyle,
    } = this.props;

    return (
      <div
        {...styles.container}
        {...containerStyle}
      >
        <Button
          icon="keyboard_arrow_up"
          onClick={this.handlePostVote('upVote')}
          style={styleType === 'compact' && styles.button}
        />

        <span {...styles.score}>{score}</span>

        <Button
          icon="keyboard_arrow_down"
          onClick={this.handlePostVote('downVote')}
          style={styleType === 'compact' && styles.button}
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
    textAlign: 'center',
  }),
  button: css({
    width: 30,
    height: 30,
    padding: 0,
  }),
  score: css({
    fontFamily: 'Open Sans',
    fontSize: 20,
  }),
};

const mapStateToProps = ({ post }) => ({
  post,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestPostVote: postId => dispatch(requestPostVote(postId)),
    requestCommentVote: commentId => dispatch(requestCommentVote(commentId)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteHandler);
