import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import Upload from './components/Upload'
import NavBar from './components/Nav';
import Profile from './components/Profile';
import Theme from './Theme';

import { ProtectedRoute, AuthRoute } from "./authRoutes";
import { ThemeProvider } from '@material-ui/core';
import { CssBaseline, } from "@material-ui/core";
function App(props) {
  return (
    <>
      <CssBaseline />
      <Theme>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <ProtectedRoute
              path="/profile/:userid"
              component={Profile}
              currentUserId={props.currentUserId}
            />
            <AuthRoute
              path="/login"
              component={Login}
              currentUserId={props.currentUserId}
            />
            <AuthRoute
              path="/register"
              component={Register}
              currentUserId={props.currentUserId}
            />
            <ProtectedRoute
              path="/upload"
              component={Upload}
              currentUserId={props.currentUserId}
            />
            {/* <Route path="/register" component={Login} /> */}
          </Switch>
        </BrowserRouter>
      </Theme>
    </>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  App
);
