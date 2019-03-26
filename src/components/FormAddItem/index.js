import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  todosInsertUpdateInput,
  todosInsertActions
} from '../../store/actions';

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
      <input
        value={input}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        disabled={pending}
        ref={this.inputRef}
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
