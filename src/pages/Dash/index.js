import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormAddItem from '../../components/FormAddItem';
import Item from '../../components/Item';

class Dash extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'TODOS_LIST_START_LISTENER' });
  }

  render() {
    const { list } = this.props;

    return (
      <div>
        <FormAddItem />

        {list.size > 0 && <h5>{list.size} items</h5>}

        {list.size > 0 &&
          Array.from(list).map(([_, item]) => (
            <Item key={item.id} data={item} />
          ))}
      </div>
    );
  }
}

export default connect(({ todos: { list } }) => ({ list }))(Dash);
