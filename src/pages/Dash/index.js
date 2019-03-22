import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonSignOut from '../../components/ButtonSignOut';

class Dash extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <div>
          my email: <strong>{user.email}</strong>
        </div>
        <div>DASH</div>

        <ButtonSignOut />
      </div>
    );
  }
}

export default connect(({ auth: { user } }) => ({ user }))(Dash);
