import React from 'react';
import { css } from 'emotion';

const WrapperBodyGrid = ({ children }) => {
  return (
    <div
      className={css`
        /* background-color: #ffeaa7; */
        display: grid;
        grid-template-rows: auto 1fr;
        max-width: 64em;
        margin: 0 auto;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 32px;
        padding-right: 32px;

        *:focus {
          outline: none;
        }

        * {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}
    >
      {children}
    </div>
  );
};

export default WrapperBodyGrid;
