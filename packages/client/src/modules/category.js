import { createAction, handleActions } from 'redux-actions';

import { getTypes } from '../utils';

const initialState = {
  isFetching: true,
  categories: [],
};

export const TYPES = getTypes('GET_CATEGORIES');

export const requestGetCategories = createAction(TYPES.GET_CATEGORIES_REQUEST);
export const fulfillGetCategories = createAction(TYPES.GET_CATEGORIES_FULFILLED);

export default handleActions(
  {
    [TYPES.GET_CATEGORIES_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),

    [TYPES.GET_CATEGORIES_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      categories: payload.categories,
    }),
  },
  initialState,
);