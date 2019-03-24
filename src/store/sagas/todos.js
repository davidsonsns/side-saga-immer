import { takeLatest, call, put, all, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
  todosListUpdateItem,
  todosInsertActions,
  TODOS_INSERT,
  TODOS_LIST_START_LISTENER
} from '../actions';
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

function* startListener() {
  // https://madewithlove.be/firebase-and-redux-saga-can-be-friends/
  const channel = eventChannel(emiter => {
    const listener = fb.firestore
      .collection('todos')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(item => {
          emiter({ ...item.data(), id: item.id });
        });
      });

    return () => {
      listener.off();
    };
  });

  while (true) {
    const data = yield take(channel);

    yield put(todosListUpdateItem(data));
  }
}

/************* BEGIN WATCHERS */
export function* watchAdd() {
  yield takeLatest(TODOS_INSERT.REQUEST, workerAdd);
}

export function* watchStartListener() {
  yield takeLatest(TODOS_LIST_START_LISTENER, startListener);
}
/************* BEGIN WATCHERS */

export default function* rootSaga() {
  yield all([watchAdd(), watchStartListener()]);
}
