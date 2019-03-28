import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import NoPrivateRoute from './components/NoPrivateRoute';
import PrivateRoute from './components/PrivateRoute';
import { loadUserActions } from './store/actions';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dash from './pages/Dash';
import WrapperBodyGrid from './components/WrapperBodyGrid';
import Header from './components/Header';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(loadUserActions.request());
  }

  render() {
    const { pendingLoadUser, user } = this.props;
    console.log('TCL: App -> render -> user', user);

    if (pendingLoadUser) {
      return (
        <WrapperBodyGrid>
          <div>loading...</div>
        </WrapperBodyGrid>
      );
    }

    return (
      <WrapperBodyGrid>
        <Router>
          <Route path="*" component={Header} />
          <Switch>
            <NoPrivateRoute
              path="/signup"
              exact
              component={SignUp}
              user={user}
            />
            <NoPrivateRoute
              path="/signin"
              exact
              component={SignIn}
              user={user}
            />
            <PrivateRoute path="/" exact component={Dash} user={user} />

            <Redirect path="*" to="/" />
          </Switch>
        </Router>
      </WrapperBodyGrid>
    );
  }
}

const mapStateToProps = ({ auth: { pendingLoadUser, user } }) => ({
  user,
  pendingLoadUser
});

export default connect(mapStateToProps)(App);
