import { put } from 'redux-saga/effects';
import uuid from 'uuid/v4';

import api, { endpoints } from '../api';
import {
  fulfillGetComments,
  fulfillCommentVote,
  fulfillGetComment,
  fulfillAddComment,
  fulfillEditComment,
  fulfillDeleteComment,
} from '../modules/comment';
import { requestGetPost } from '../modules/post';

export function * requestGetComments ({ payload: postId }) {
  const { data } = yield api.get({
    url: endpoints.comments({ postId }),
  });

  yield put(fulfillGetComments(data));
}

export function * requestCommentVote ({ payload }) {
  const { data } = yield api.post({
    url: endpoints.comments({ commentId: payload.commentId }),
    data: {
      option: payload.type,
    },
  });

  yield put(fulfillCommentVote(data));
}

export function * requestGetComment ({ payload: commentId }) {
  const { data } = yield api.get({
    url: endpoints.comments({ commentId }),
  });

  yield put(fulfillGetComment(data));
}

export function * requestAddComment ({ payload }) {
  const { parentId, body, author } = payload;

  const { data } = yield api.post({
    url: endpoints.comments(),
    data: {
      id: uuid(),
      parentId,
      body,
      author,
      timestamp: Date.now(),
    },
  });

  yield put(fulfillAddComment(data));
  yield put(requestGetPost(parentId));
}

export function * requestEditComment ({ payload }) {
  const { commentId, title, body } = payload;

  const { data } = yield api.put({
    url: endpoints.comments({ commentId }),
    data: {
      title,
      body,
    },
  });

  yield put(fulfillEditComment(data));
}

export function * requestDeleteComment ({ payload }) {
  const { data } = yield api.delete({
    url: endpoints.comments({ commentId: payload.id }),
  });

  yield put(fulfillDeleteComment(data));
  yield put(requestGetPost(payload.parentId));
}
