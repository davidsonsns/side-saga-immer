import React from 'react';
import { css } from 'emotion';

// https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components
const Input = React.forwardRef((props, ref) => (
  <input
    className={css`
      width: 100%;
      border-radius: 4px;
      border-width: 1px;
      line-height: 35px;
      padding: 2px 7px;
    `}
    {...props}
    ref={ref}
  />
));

export default Input;
