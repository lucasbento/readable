import { put } from 'redux-saga/effects';
import uuid from 'uuid/v4';

import api, { endpoints } from '../api';
import {
  fulfillGetPosts,
  fulfillPostVote,
  fulfillGetPost,
  fulfillAddPost,
  fulfillEditPost,
  fulfillDeletePost,
} from '../modules/post';

export function * requestGetPosts ({ payload: categoryPath }) {
  const url = categoryPath ?
    endpoints.posts({ categoryPath }) :
    endpoints.posts();

  const { data } = yield api.get({
    url,
  });

  yield put(fulfillGetPosts(data));
}

export function * requestPostVote ({ payload }) {
  const { data } = yield api.post({
    url: endpoints.posts({ id: payload.postId }),
    data: {
      option: payload.type,
    },
  });

  yield put(fulfillPostVote(data));
}

export function * requestGetPost ({ payload: postId }) {
  const { data } = yield api.get({
    url: endpoints.posts({ id: postId }),
  });

  yield put(fulfillGetPost(data));
}

export function * requestAddPost ({ payload }) {
  const { title, body, author, category } = payload;

  const { data } = yield api.post({
    url: endpoints.posts(),
    data: {
      id: uuid(),
      title,
      body,
      author,
      category,
      timestamp: Date.now(),
    },
  });

  yield put(fulfillAddPost(data));
}

export function * requestEditPost ({ payload }) {
  const { postId,  title, body } = payload;

  const { data } = yield api.put({
    url: endpoints.posts({ id: postId }),
    data: {
      title,
      body,
    },
  });

  yield put(fulfillEditPost(data));
}

export function * requestDeletePost ({ payload: postId }) {
  const { data } = yield api.delete({
    url: endpoints.posts({ id: postId }),
  });

  yield put(fulfillDeletePost(data));
}
