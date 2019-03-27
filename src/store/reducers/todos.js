import produce from 'immer';

import {
  TODOS_INSERT,
  TODOS_INSERT_INPUT_UPDATE,
  TODOS_LIST_UPDATE_ITEM,
  TODOS_ITEM_REMOVE,
  TODOS_ITEM_CHANGE_FIELD,
  TODOS_ITEM_UPDATE_ITEM_FIELD
} from '../actions';

const initialState = {
  insert: {
    pending: false,
    error: null,
    input: ''
  },
  list: new Map(),
  sort: {
    created: 'asc'
  }
};

export default (state = initialState, { type, error, value, item, id, name }) =>
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

      /**
       * @see https://github.com/mweststrate/immer#supported-object-types
       */
      case TODOS_LIST_UPDATE_ITEM: {
        if (draft.list.has(item.id)) {
          draft.list.set(item.id, item);
        } else if (draft.sort.created === 'asc') {
          const newList = new Map();
          newList.set(item.id, item);

          draft.list = new Map([...newList, ...draft.list]);
        }
        break;
      }

      case TODOS_ITEM_REMOVE.REQUEST: {
        const newList = new Map(draft.list);
        newList.set(id, { ...newList.get(id), pending: true });
        draft.list = newList;
        break;
      }

      case TODOS_ITEM_REMOVE.SUCCESS: {
        const newList = new Map(draft.list);
        newList.delete(id);

        draft.list = newList;
        break;
      }

      case TODOS_ITEM_REMOVE.FAILURE: {
        break;
      }

      case TODOS_ITEM_CHANGE_FIELD: {
        const newList = new Map(draft.list);
        newList.set(id, { ...newList.get(id), [name]: value });

        draft.list = newList;
        break;
      }

      case TODOS_ITEM_UPDATE_ITEM_FIELD.REQUEST: {
        const newList = new Map(draft.list);
        newList.set(id, { ...newList.get(id), pending: true });

        draft.list = newList;
        break;
      }

      case TODOS_ITEM_UPDATE_ITEM_FIELD.SUCCESS: {
        const newList = new Map(draft.list);
        newList.set(id, { ...newList.get(id), pending: false });

        draft.list = newList;
        break;
      }

      case 'SIGNOUT_SUCCESS': {
        draft.insert = initialState.insert;
        draft.list = initialState.list;
        draft.sort = initialState.sort;
        break;
      }
    }
  });
