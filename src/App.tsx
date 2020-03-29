import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import { AppProps } from './actions';

class App extends React.Component<AppProps, {isAuthenticated: boolean | undefined}> {
  state = {isAuthenticated: this.props.isAuthenticated};
  render() {
    const { isAuthenticated, isVerifying } = this.props;

    return (
      <Switch>
      <ProtectedRoute
        exact
        path='/'
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path='/login' component={Login} />
    </Switch>
    )
  }
}


const mapStateToProps = (state: AppProps) => {
  return {
    isAuthenticated: state.auth!.isAuthenticated,
    isVerifying: state.auth!.isVerifying
  };
};

export default connect(mapStateToProps)(App);
