import produce from 'immer';

import { TODOS_INSERT, TODOS_INSERT_INPUT_UPDATE } from '../actions';

const initialState = {
  insert: {
    pending: false,
    error: null,
    input: ''
  },
  todos: []
};

export default (state = initialState, { type, error, value }) =>
  produce(state, draft => {
    switch (type) {
      case TODOS_INSERT.REQUEST:
        draft.insert.pending = true;
        draft.insert.error = null;
        break;

      case TODOS_INSERT.SUCCESS:
        draft.insert.pending = false;
        draft.insert.error = null;
        draft.insert.input = '';
        break;

      case TODOS_INSERT.FAILURE:
        draft.pending = false;
        draft.error = error;
        break;

      case TODOS_INSERT_INPUT_UPDATE: {
        draft.insert.input = value;
        break;
      }
    }
  });
