import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { TODOS_ITEM_REMOVE, todosItemChangeField } from '../../store/actions';

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
          margin: 10px 0%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 2px 7px;
        `}
      >
        <textarea value={name} onChange={this.onChange} className={css``} />

        <button type="button" onClick={this.remove} className={css``}>
          Remove
        </button>

        {pending && <strong>pending...</strong>}
      </div>
    );
  }
}

export default connect()(Item);
