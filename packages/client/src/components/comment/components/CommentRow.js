import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Card from '../../common/Card';
import VoteHandler from '../../common/VoteHandler';
import Button from '../../common/Button';

class CommentRow extends PureComponent {
  render() {
    const {
      id,
      body,
      author,
      voteScore,
      onClickEdit,
      onClickDelete,
    } = this.props;

    return (
      <Card {...styles.container}>
        <VoteHandler
          id={id}
          type="comment"
          score={voteScore}
          styleType="compact"
          containerStyle={styles.voteHandlerContainer}
        />

        <div {...styles.commentContainer}>
          <span {...styles.body}>{body}</span>
        
          <span {...styles.author}>{author}</span>
        </div>

        <div {...styles.actionsContainer}>
          <Button
            icon="mode_edit"
            style={styles.button}
            iconStyle={styles.buttonIcon}
            onClick={onClickEdit(id)}
          />

          <Button
            icon="delete"
            style={styles.button}
            iconStyle={styles.buttonIcon}
            onClick={onClickDelete(id)}
          />
        </div>
      </Card>
    );
  }
}

const styles = {
  container: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: 'initial',
    boxShadow: '0px 6px 35px -18px rgba(0,0,0,0.75)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(230, 230, 230, 0.43)',
    marginBottom: 10,
    padding: 5,
  }),
  voteHandlerContainer: css({
    flex: 'initial',
  }),
  commentContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  }),
  body: css({
    fontFamily: 'Open Sans',
  }),
  author: css({
    fontFamily: 'Open Sans',
    alignSelf: 'flex-end',
  }),
  actionsContainer: css({
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  }),
  button: css({
    borderRadius: 0,
    width: 25,
    height: 25,
    padding: 0,
  }),
  buttonIcon: css({
    fontSize: 20,
  }),
};

export default CommentRow;
