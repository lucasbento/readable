import { put } from 'redux-saga/effects';

import api, { endpoints } from '../api';
import { fulfillGetCategories } from '../modules/category';

export function * requestGetCategories () {
  const { data } = yield api.get({
    url: endpoints.categories(),
  });

  yield put(fulfillGetCategories(data));
}
