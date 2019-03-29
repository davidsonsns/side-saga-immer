import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';

const ItemButton = ({ children, ...props }) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={css`
        height: 25px;
        background: #ff6b6b;
        border-width: 0px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        line-height: 1;

        &:hover {
          background: #ee5253;
        }
      `}
    >
      {children}
    </button>
  );
};

ItemButton.propTypes = {};

export default ItemButton;
