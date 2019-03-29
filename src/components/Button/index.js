import React from 'react';
import { css } from 'emotion';

const Button = ({ children, ...props }) => {
  return (
    <button
      type="button"
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

        &:disabled {
          background: #dddddd;
          pointer-events: none;
        }
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
