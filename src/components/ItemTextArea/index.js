/** @jsx jsx */
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

class ItemTextArea extends Component {
  txtRef = React.createRef();

  componentDidMount() {
    this.adjustArea();
  }

  adjustArea = () => {
    this.txtRef.current.style.height = '1px';
    this.txtRef.current.style.height = this.txtRef.current.scrollHeight + 'px';
  };

  render() {
    return (
      <textarea
        css={css`
          border-width: 0px;
          resize: none;
          overflow: hidden;
          min-height: 25px;
          line-height: 1.7;
          border-radius: 4px;
          padding: 5px;

          &:hover:not(:focus) {
            background: #f5f5f5;
            cursor: pointer;
          }
        `}
        {...this.props}
        ref={this.txtRef}
        onKeyUp={this.adjustArea}
        onKeyPress={this.adjustArea}
        onChange={ev => {
          this.props.onChange(ev);
          this.adjustArea();
        }}
        placeholder="write here..."
      />
    );
  }
}

ItemTextArea.propTypes = {};

export default ItemTextArea;
