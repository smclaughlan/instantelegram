import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import Upload from './components/Upload'
import NavBar from './components/Nav';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Theme from './Theme';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ProtectedRoute, AuthRoute } from "./authRoutes";
import { CssBaseline, } from "@material-ui/core";

function App(props) {
  return (
    <>
      <CssBaseline />
      <Theme>
        <BrowserRouter>
          <NavBar location={props.location} />

          <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames='fade'
              >
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
                  <ProtectedRoute
                    exact path="/"
                    component={Feed}
                    currentUserId={props.currentUserId}
                  />
                  {/* <Route path="/register" component={Login} /> */}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
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
