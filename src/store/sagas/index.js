import { all } from 'redux-saga/effects';

import watchAuth from './auth';
import watchTodos from './todos';

export default function* rootSaga() {
  yield all([watchAuth(), watchTodos()]);
}
