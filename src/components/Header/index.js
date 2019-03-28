import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import ButtonSignOut from '../ButtonSignOut';

const Header = ({ user, location }) => {
  let pathname = location.pathname.slice(1);
  if (pathname === '') {
    pathname = 'dash';
  }

  return (
    <header>
      {user && (
        <h5
          className={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          {user.email}
          <ButtonSignOut />
        </h5>
      )}

      <h3
        className={css`
          text-transform: capitalize;
        `}
      >
        {pathname}
      </h3>
    </header>
  );
};

Header.propTypes = {};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Header);
