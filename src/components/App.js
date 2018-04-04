import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Chat from './Chat';
import Login from './Login';
import { fetchUser } from '../actions/authActions';

class App extends Component {
  componentWillMount() {
    if (this.props.isAuthenticated) this.props.dispatch(fetchUser());
  }
  render() {
    return (
      <Router basename={process.env.REACT_APP_BASE_NAME || '/'}>
        <Container fluid>
          <Switch>
            <PrivateRoute path="/chat" component={Chat} />
            <Route path="/login" component={Login} />
            <Redirect to="/chat" />
          </Switch>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(App);
