import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  SIGNUP,
  signupActions,
  LOAD_USER,
  loadUserActions,
  SIGNIN,
  signinActions,
  SIGNOUT,
  signoutActions
} from '../actions';
import fb from '../../firebase';

function* workerSaga({ email, password }) {
  try {
    const { user } = yield call(
      [fb.auth, fb.auth.createUserWithEmailAndPassword],
      email,
      password
    );

    localStorage.setItem('user', JSON.stringify(user));

    yield put(signupActions.success(user));
  } catch (error) {
    yield put(signupActions.failure(error));
  }
}

function* workerSignOut() {
  try {
    yield call([fb.auth, fb.auth.signOut]);

    localStorage.removeItem('user');

    yield put(signoutActions.success());
  } catch (error) {
    yield put(signoutActions.failure(error));
  }
}

function* workerSigIn({ email, password }) {
  try {
    const { user } = yield call(
      [fb.auth, fb.auth.signInWithEmailAndPassword],
      email,
      password
    );

    localStorage.setItem('user', JSON.stringify(user));

    yield put(signinActions.success(user));
  } catch (error) {
    yield put(signinActions.failure(error));
  }
}

// see https://firebase.google.com/docs/auth/web/auth-state-persistence
function* workerLoadUser() {
  try {
    const user = yield call([localStorage, 'getItem'], 'user');

    yield put(loadUserActions.success(JSON.parse(user)));
  } catch (error) {
    console.log('TCL: function*workerLoadUser -> error', error);
    // yield put(signupActions.failure(error));
  }
}

/************* BEGIN WATCHERS */
export function* watchSignUp() {
  yield takeLatest(SIGNUP.REQUEST, workerSaga);
}

export function* watchSignIn() {
  yield takeLatest(SIGNIN.REQUEST, workerSigIn);
}

export function* watchSignOut() {
  yield takeLatest(SIGNOUT.REQUEST, workerSignOut);
}

export function* watchLoadUser() {
  yield takeLatest(LOAD_USER.REQUEST, workerLoadUser);
}
/************* BEGIN WATCHERS */

export default function* rootSaga() {
  yield all([watchSignUp(), watchSignIn(), watchSignOut(), watchLoadUser()]);
}
