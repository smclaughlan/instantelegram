import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import Upload from './components/Upload'
import NavBar from './components/Nav';
import Profile from './components/Profile';
import { ProtectedRoute, AuthRoute } from "./authRoutes";

function App(props) {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/profile/:userid" component={Profile} />
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
