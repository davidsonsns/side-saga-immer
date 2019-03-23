import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonSignOut from '../../components/ButtonSignOut';
import FormAddItem from '../../components/FormAddItem';

class Dash extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <ButtonSignOut />
        <div>
          my emsail: <strong>{user.email}</strong>
        </div>
        <div>DASH</div>

        <FormAddItem />
      </div>
    );
  }
}

export default connect(({ auth: { user } }) => ({ user }))(Dash);
