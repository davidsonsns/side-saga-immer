import produce from 'immer';

import {
  TODOS_INSERT,
  TODOS_INSERT_INPUT_UPDATE,
  TODOS_LIST_UPDATE_ITEM
} from '../actions';

const initialState = {
  insert: {
    pending: false,
    error: null,
    input: ''
  },
  list: []
};

export default (state = initialState, { type, error, value, item }) =>
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

      case TODOS_LIST_UPDATE_ITEM: {
        const itemIndex = draft.list.findIndex(({ id }) => id === item.id);

        if (itemIndex === -1) {
          draft.list.push(item);
        } else {
          draft.list[itemIndex] = item;
        }
        break;
      }
    }
  });
