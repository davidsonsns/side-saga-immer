import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  todosInsertUpdateInput,
  todosInsertActions
} from '../../store/actions';

class FormAddItem extends Component {
  onChange = ({ target: { value } }) => {
    const { dispatch } = this.props;

    dispatch(todosInsertUpdateInput(value));
  };

  onKeyPress = ev => {
    const { dispatch } = this.props;

    if (ev.key === 'Enter') {
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
