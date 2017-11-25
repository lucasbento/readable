import { createAction, handleActions } from 'redux-actions';

import { getTypes, sortByScore } from '../utils';

const initialState = {
  isFetching: true,
  comments: [],
  comment: {
    id: '',
    parentId: '',
    timestamp: 0,
    body: '',
    author: '',
    voteScore: 0,
    deleted: false,
    parentDeleted: false,
  },
};

export const TYPES = {
  ...getTypes('GET_COMMENTS'),
  ...getTypes('COMMENT_VOTE'),
  ...getTypes('GET_COMMENT'),
  ...getTypes('ADD_COMMENT'),
  ...getTypes('EDIT_COMMENT'),
  ...getTypes('DELETE_COMMENT'),
};

export const requestGetComments = createAction(TYPES.GET_COMMENTS_REQUEST);
export const fulfillGetComments = createAction(TYPES.GET_COMMENTS_FULFILLED);

export const requestCommentVote = createAction(TYPES.COMMENT_VOTE_REQUEST);
export const fulfillCommentVote = createAction(TYPES.COMMENT_VOTE_FULFILLED);

export const requestGetComment = createAction(TYPES.GET_COMMENT_REQUEST);
export const fulfillGetComment = createAction(TYPES.GET_COMMENT_FULFILLED);

export const requestAddComment = createAction(TYPES.ADD_COMMENT_REQUEST);
export const fulfillAddComment = createAction(TYPES.ADD_COMMENT_FULFILLED);

export const requestEditComment = createAction(TYPES.EDIT_COMMENT_REQUEST);
export const fulfillEditComment = createAction(TYPES.EDIT_COMMENT_FULFILLED);

export const requestDeleteComment = createAction(TYPES.DELETE_COMMENT_REQUEST);
export const fulfillDeleteComment = createAction(TYPES.DELETE_COMMENT_FULFILLED);

export default handleActions(
  {
    [TYPES.GET_COMMENTS_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.GET_COMMENTS_FULFILLED]: (state, { payload: comments }) => ({
      ...state,
      isFetching: false,
      comments: sortByScore(comments),
    }),

    [TYPES.COMMENT_VOTE_FULFILLED]: (state, { payload }) => ({
      ...state,
      comments: sortByScore(
          state.comments.map(comment => ({
          ...comment,
          voteScore: payload.id === comment.id ? payload.voteScore : comment.voteScore,
        })),
      ),
      comment: {
        ...state.comment,
        voteScore: state.comment.id === payload.id ? payload.voteScore : state.comment.voteScore,
      },
    }),

    [TYPES.GET_COMMENT_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.GET_COMMENT_FULFILLED]: (state, { payload: comment }) => ({
      ...state,
      isFetching: false,
      comment,
    }),

    [TYPES.ADD_COMMENT_REQUEST]: state => ({
      ...state,
      isSaving: true,
    }),

    [TYPES.ADD_COMMENT_FULFILLED]: (state, { payload: comment }) => ({
      ...state,
      isSaving: false,
      comments: [
        ...state.comments,
        comment,
      ],
    }),

    [TYPES.EDIT_COMMENT_REQUEST]: state => ({
      ...state,
      isSaving: true,
    }),

    [TYPES.EDIT_COMMENT_FULFILLED]: (state, { payload }) => ({
      ...state,
      isSaving: false,
      comments: state.comments.map(comment => ({
        ...comment,
        body: comment.id === payload.id ? payload.body : comment.body,
      })),
      comment: {
        ...state.comment,
        body: payload.body,
      },
    }),

    [TYPES.DELETE_COMMENT_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.DELETE_COMMENT_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      comments: state.comments.filter(comment => comment.id !== payload.id),
      comment: initialState.comment,
    }),
  },
  initialState,
);