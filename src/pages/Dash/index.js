import React, { Component } from 'react';
import { connect } from 'react-redux';

import ButtonSignOut from '../../components/ButtonSignOut';
import FormAddItem from '../../components/FormAddItem';
import Item from '../../components/Item';

class Dash extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'TODOS_LIST_START_LISTENER' });
  }

  render() {
    const { user, list } = this.props;

    return (
      <div>
        <ButtonSignOut />
        <div>
          my emsail: <strong>{user.email}</strong>
        </div>
        <div>DASH</div>

        <FormAddItem />

        {list.size &&
          Array.from(list).map(([_, item]) => (
            <Item key={item.id} data={item} />
          ))}
      </div>
    );
  }
}

export default connect(({ auth: { user }, todos: { list } }) => ({
  user,
  list
}))(Dash);
