import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { TODOS_ITEM_REMOVE } from '../../store/actions';

class Item extends PureComponent {
  remove = () => {
    const { dispatch, data } = this.props;

    dispatch({
      type: TODOS_ITEM_REMOVE.REQUEST,
      id: data.id
    });
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        {data.name}

        <button type="button" onClick={this.remove}>
          Remove
        </button>
      </div>
    );
  }
}

export default connect()(Item);
