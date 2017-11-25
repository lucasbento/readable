import { createAction, handleActions } from 'redux-actions';

import { getTypes, sortByScore } from '../utils';

const initialState = {
  isFetching: true,
  isSaving: false,
  posts: [],
  post: {
    id: '',
    timestamp: 0,
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: 0,
    deleted: '',
    commentCount: 0,
  },
};

export const TYPES = {
  ...getTypes('GET_POSTS'),
  ...getTypes('POST_VOTE'),
  ...getTypes('GET_POST'),
  ...getTypes('ADD_POST'),
  ...getTypes('EDIT_POST'),
  ...getTypes('DELETE_POST'),
};

export const requestGetPosts = createAction(TYPES.GET_POSTS_REQUEST);
export const fulfillGetPosts = createAction(TYPES.GET_POSTS_FULFILLED);

export const requestPostVote = createAction(TYPES.POST_VOTE_REQUEST);
export const fulfillPostVote = createAction(TYPES.POST_VOTE_FULFILLED);

export const requestGetPost = createAction(TYPES.GET_POST_REQUEST);
export const fulfillGetPost = createAction(TYPES.GET_POST_FULFILLED);

export const requestAddPost = createAction(TYPES.ADD_POST_REQUEST);
export const fulfillAddPost = createAction(TYPES.ADD_POST_FULFILLED);

export const requestEditPost = createAction(TYPES.EDIT_POST_REQUEST);
export const fulfillEditPost = createAction(TYPES.EDIT_POST_FULFILLED);

export const requestDeletePost = createAction(TYPES.DELETE_POST_REQUEST);
export const fulfillDeletePost = createAction(TYPES.DELETE_POST_FULFILLED);

export default handleActions(
  {
    [TYPES.GET_POSTS_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.GET_POSTS_FULFILLED]: (state, { payload: posts }) => ({
      ...state,
      isFetching: false,
      posts: sortByScore(posts),
    }),

    [TYPES.POST_VOTE_FULFILLED]: (state, { payload }) => ({
      ...state,
      posts: sortByScore(
          state.posts.map(post => ({
          ...post,
          voteScore: payload.id === post.id ? payload.voteScore : post.voteScore,
        })),
      ),
      post: {
        ...state.post,
        voteScore: state.post.id === payload.id ? payload.voteScore : state.post.voteScore,
      },
    }),

    [TYPES.GET_POST_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.GET_POST_FULFILLED]: (state, { payload: post }) => ({
      ...state,
      isFetching: false,
      post,
    }),

    [TYPES.ADD_POST_REQUEST]: state => ({
      ...state,
      isSaving: true,
    }),

    [TYPES.ADD_POST_FULFILLED]: (state, { payload: post }) => ({
      ...state,
      isSaving: false,
      posts: [
        ...state.posts,
        post,
      ],
    }),

    [TYPES.EDIT_POST_REQUEST]: state => ({
      ...state,
      isSaving: true,
    }),

    [TYPES.EDIT_POST_FULFILLED]: (state, { payload: post }) => ({
      ...state,
      isSaving: false,
      post,
    }),

    [TYPES.DELETE_POST_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.DELETE_POST_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      posts: state.posts.filter(post => post.id !== payload.id),
      post: initialState.post,
    }),
  },
  initialState,
);