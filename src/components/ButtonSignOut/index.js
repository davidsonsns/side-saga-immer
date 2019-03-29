import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { signoutActions } from '../../store/actions';
import Button from '../Button';

const ButtonSignOut = ({ dispatch }) => {
  return (
    <Button onClick={() => dispatch(signoutActions.request())}>SignOut</Button>
  );
};

export default connect()(ButtonSignOut);
