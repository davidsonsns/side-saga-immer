import { takeLatest, call, put, all, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
  todosListUpdateItem,
  todosInsertActions,
  TODOS_INSERT,
  TODOS_LIST_START_LISTENER,
  todosRemoveItem,
  TODOS_ITEM_REMOVE
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
      yield call([fb, 'firestoreAdd'], {
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
      .orderBy('created', 'asc')
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

function* startRemoveItem({ id }) {
  try {
    yield call([fb, 'firestoreRemoveItem'], { id });

    yield put(todosRemoveItem.success({ id }));
  } catch (error) {
    yield put(
      todosRemoveItem.failure(
        error.message ? { message: error.message } : error
      )
    );
  }
}

/************* BEGIN WATCHERS */
export function* watchAdd() {
  yield takeLatest(TODOS_INSERT.REQUEST, workerAdd);
}

export function* watchStartListener() {
  yield takeLatest(TODOS_LIST_START_LISTENER, startListener);
}

export function* watchRemoveItem() {
  yield takeLatest(TODOS_ITEM_REMOVE.REQUEST, startRemoveItem);
}
/************* BEGIN WATCHERS */

export default function* rootSaga() {
  yield all([watchAdd(), watchStartListener(), watchRemoveItem()]);
}
