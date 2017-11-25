import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Card from '../../common/Card';
import VoteHandler from '../../common/VoteHandler';
import CommentCount from './CommentCount';

class PostRow extends PureComponent {
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
          <h1 {...styles.title}>
            {title}
          </h1>

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
  title: css({
    fontSize: 19,
    margin: '0px 0px 10px 0px',
  }),
  infoContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
};

export default PostRow;
