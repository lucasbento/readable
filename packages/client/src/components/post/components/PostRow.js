import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Card from '../../common/Card';
import VoteHandler from '../../common/VoteHandler';
import CommentCount from './CommentCount';
import Button from '../../common/Button';

class PostRow extends PureComponent {
  handleOnClickButton = (type) => (e) => {
    e.stopPropagation();

    if (type === 'edit') {
      return this.props.onClickEdit(this.props.id);
    }

    return this.props.onClickDelete(this.props.id);
  }

  render() {
    const {
      id,
      title,
      author,
      voteScore,
      commentCount,
      onClick,
    } = this.props;

    return (
      <div {...styles.container}>
        <VoteHandler
          id={id}
          score={voteScore}
        />

        <Card
          {...styles.cardContainer}
          onClick={onClick}
        >
          <div {...styles.headerContainer}>
            <h1 {...styles.title}>
              {title}
            </h1>

            <div {...styles.actionsContainer}>
              <Button
                icon="mode_edit"
                style={styles.button}
                iconStyle={styles.buttonIcon}
                onClick={this.handleOnClickButton('edit')}
              />
    
              <Button
                icon="delete"
                style={styles.button}
                iconStyle={styles.buttonIcon}
                onClick={this.handleOnClickButton('delete')}
              />
            </div>
          </div>

          <div {...styles.infoContainer}>
            <span>{author}</span>

            <CommentCount value={commentCount} />
          </div>
        </Card>
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    margin: '0px 15px',
  }),
  cardContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  }),
  headerContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  title: css({
    fontSize: 19,
    margin: '0px 0px 10px 0px',
  }),
  infoContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  actionsContainer: css({
    display: 'flex',
    flexDirection: 'row',
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

export default PostRow;
