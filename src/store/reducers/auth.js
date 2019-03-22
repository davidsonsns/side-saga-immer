import produce from 'immer';

import { SIGNUP, SIGNIN, LOAD_USER, SIGNOUT } from '../actions';

const initialState = {
  user: null,
  error: null,
  pendingLoadUser: false,
  pending: false
};

export default (state = initialState, { type, user, error }) =>
  produce(state, draft => {
    switch (type) {
      case SIGNUP.REQUEST:
      case SIGNIN.REQUEST:
        draft.pending = true;
        draft.user = null;
        draft.error = null;
        break;

      case SIGNUP.SUCCESS:
      case SIGNIN.SUCCESS:
        draft.pending = false;
        draft.error = null;
        draft.user = user;
        break;

      case SIGNUP.FAILURE:
      case SIGNIN.FAILURE:
      case SIGNOUT.FAILURE:
        draft.pending = false;
        draft.error = error;
        break;

      case SIGNOUT.REQUEST:
        draft.pending = true;
        break;

      case SIGNOUT.SUCCESS:
        draft.pending = false;
        draft.user = null;
        break;

      case LOAD_USER.REQUEST:
        draft.pendingLoadUser = true;
        draft.user = null;
        draft.error = null;
        break;

      case LOAD_USER.SUCCESS:
        draft.pendingLoadUser = false;
        draft.user = user;
        break;

      case LOAD_USER.FAILURE:
        draft.pendingLoadUser = false;
        draft.error = error;
        break;
    }
  });
