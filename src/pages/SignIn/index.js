import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

import { signinActions } from '../../store/actions';
import Input from '../../components/Input';
import Button from '../../components/Button';

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
      <form
        onSubmit={onSubmit}
        className={css`
          display: grid;
          grid-row-gap: 15px;
        `}
      >
        {error && (
          <div style={{ color: '#ff6b6b' }}>
            <strong>{error.code}: </strong>
            <span>{error.message}</span>
          </div>
        )}

        <Input
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="Email: myemail@gmail.com"
        />

        <Input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />

        {(!email || !password) && <div>Complete the inputs</div>}

        <Button type="submit" disabled={pending || !email || !password}>
          {pending ? 'Wait...' : 'Submit'}
        </Button>

        <Link to="/signup">SignUp</Link>
      </form>
    );
  }
}

export default connect(({ auth: { pending, error } }) => ({
  pending,
  error
}))(SignIn);
