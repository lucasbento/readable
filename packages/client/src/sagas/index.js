import { takeLatest, all } from 'redux-saga/effects'

import { TYPES as POST_TYPES } from '../modules/post';
import { TYPES as CATEGORY_TYPES } from '../modules/category';
import { TYPES as COMMENT_TYPES } from '../modules/comment';

import * as postSagas from './post';
import * as categorySagas from './category';
import * as commentSagas from './comment';

export default function * rootSaga () {
  yield all([
    takeLatest(POST_TYPES.GET_POSTS_REQUEST, postSagas.requestGetPosts),
    takeLatest(POST_TYPES.POST_VOTE_REQUEST, postSagas.requestPostVote),
    takeLatest(POST_TYPES.GET_POST_REQUEST, postSagas.requestGetPost),
    takeLatest(POST_TYPES.ADD_POST_REQUEST, postSagas.requestAddPost),
    takeLatest(POST_TYPES.EDIT_POST_REQUEST, postSagas.requestEditPost),
    takeLatest(POST_TYPES.DELETE_POST_REQUEST, postSagas.requestDeletePost),

    takeLatest(CATEGORY_TYPES.GET_CATEGORIES_REQUEST, categorySagas.requestGetCategories),

    takeLatest(COMMENT_TYPES.GET_COMMENTS_REQUEST, commentSagas.requestGetComments),
    takeLatest(COMMENT_TYPES.COMMENT_VOTE_REQUEST, commentSagas.requestCommentVote),
    takeLatest(COMMENT_TYPES.GET_COMMENT_REQUEST, commentSagas.requestGetComment),
    takeLatest(COMMENT_TYPES.ADD_COMMENT_REQUEST, commentSagas.requestAddComment),
    takeLatest(COMMENT_TYPES.EDIT_COMMENT_REQUEST, commentSagas.requestEditComment),
    takeLatest(COMMENT_TYPES.DELETE_COMMENT_REQUEST, commentSagas.requestDeleteComment),
  ]);
};
