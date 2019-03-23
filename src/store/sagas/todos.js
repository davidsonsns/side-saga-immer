import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import { todosInsertActions, TODOS_INSERT } from '../actions';
import fb from '../../firebase';

function* workerAdd() {
  try {
    const {
      todos: {
        insert: { input }
      }
    } = yield select();

    if (input) {
      yield call([fb.firestore.collection('todos'), 'add'], {
        name: input
      });

      yield put(todosInsertActions.success());
    }
  } catch (error) {
    yield put(
      todosInsertActions.failure(
        error.message ? { message: error.message } : error
      )
    );
  }
}

/************* BEGIN WATCHERS */
export function* watchAdd() {
  yield takeLatest(TODOS_INSERT.REQUEST, workerAdd);
}
/************* BEGIN WATCHERS */

export default function* rootSaga() {
  yield all([watchAdd()]);
}
