import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import {
  todosInsertUpdateInput,
  todosInsertActions
} from '../../store/actions';
import Input from '../Input';

class FormAddItem extends Component {
  inputRef = React.createRef();

  componentDidUpdate({ input, pending }) {
    if (input !== this.props.input && pending !== this.props.pending) {
      this.inputRef.current.focus();
    }
  }

  onChange = ({ target: { value } }) => {
    const { dispatch } = this.props;

    dispatch(todosInsertUpdateInput(value));
  };

  onKeyPress = ev => {
    const { dispatch, input } = this.props;

    if (ev.key === 'Enter' && input) {
      dispatch(todosInsertActions.request());
    }
  };

  render() {
    const { input, pending } = this.props;

    return (
      <Input
        value={input}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        disabled={pending}
        ref={this.inputRef}
        placeholder="Add item..."
      />
    );
  }
}

const mapStateToProps = ({
  todos: {
    insert: { input, pending }
  }
}) => ({ input, pending });

export default connect(mapStateToProps)(FormAddItem);
