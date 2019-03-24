import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonSignOut from '../../components/ButtonSignOut';
import FormAddItem from '../../components/FormAddItem';

class Dash extends Component {
  state = {
    items: []
  };

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

        {list.length && list.map(item => <div key={item.id}>{item.name}</div>)}
      </div>
    );
  }
}

export default connect(({ auth: { user }, todos: { list } }) => ({
  user,
  list
}))(Dash);
