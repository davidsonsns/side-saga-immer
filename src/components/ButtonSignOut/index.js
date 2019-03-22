import React from 'react';
import { connect } from 'react-redux';

import { signoutActions } from '../../store/actions';

const ButtonSignOut = ({ dispatch }) => {
  return (
    <button type="button" onClick={() => dispatch(signoutActions.request())}>
      SignOut
    </button>
  );
};

export default connect()(ButtonSignOut);
