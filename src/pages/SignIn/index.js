import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signinActions } from '../../store/actions';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const {
      state: { email, password },
      props: { dispatch }
    } = this;

    if (email && password) {
      dispatch(signinActions.request({ email, password }));
    }
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      state: { email, password },
      props: { pending, error },
      onChange,
      onSubmit
    } = this;

    return (
      <div>
        <h4>SignIn</h4>

        {error && (
          <div>
            <strong>{error.code}: </strong>
            <span>{error.message}</span>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <input name="email" type="email" value={email} onChange={onChange} />

          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(({ auth: { pending, error } }) => ({
  pending,
  error
}))(SignIn);
