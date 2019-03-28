import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { signoutActions } from '../../store/actions';

const ButtonSignOut = ({ dispatch }) => {
  return (
    <button
      type="button"
      onClick={() => dispatch(signoutActions.request())}
      className={css`
        background: #dfe6e9;
        border-width: 0px;
        padding: 10px 20px;
        border-radius: 4px;
        line-height: 1;
        cursor: pointer;

        &:hover {
          background: #b2bec3;
          color: #fff;
        }
      `}
    >
      SignOut
    </button>
  );
};

export default connect()(ButtonSignOut);
