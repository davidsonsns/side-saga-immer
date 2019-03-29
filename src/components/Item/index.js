import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import ItemTextArea from '../ItemTextArea';
import { TODOS_ITEM_REMOVE, todosItemChangeField } from '../../store/actions';
import ItemButton from '../ItemButton';

class Item extends PureComponent {
  remove = () => {
    const { dispatch, data } = this.props;

    dispatch({
      type: TODOS_ITEM_REMOVE.REQUEST,
      id: data.id
    });
  };

  onChange = ({ target: { value } }) => {
    const {
      dispatch,
      data: { id }
    } = this.props;

    dispatch(todosItemChangeField({ id, name: 'name', value }));
  };

  render() {
    const {
      data: { name, pending }
    } = this.props;

    return (
      <div
        className={css`
          border-radius: 4px;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.1);
          display: grid;
          grid-column-gap: 10px;
          grid-template-columns: 1fr 10vw;
          margin: 10px 0%;
          padding: 10px;
        `}
      >
        <ItemTextArea value={name} onChange={this.onChange} />

        <ItemButton onClick={this.remove} pending={pending}>
          {pending ? 'Wait...' : 'Remove'}
        </ItemButton>
      </div>
    );
  }
}

export default connect()(Item);
