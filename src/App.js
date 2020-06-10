import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import Upload from './components/Upload'
import NavBar from './components/Nav';
<<<<<<< HEAD
import Image from './components/Image';
=======
import Profile from './components/Profile';
>>>>>>> master
import { ProtectedRoute, AuthRoute } from "./authRoutes";

function App(props) {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <AuthRoute
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
            path="/image"
            component={Image}
            currentUserId={props.currentUserId}
            imageId={"4"}
            imageUrl={"https://res.cloudinary.com/dgzcv1mcs/image/upload/v1591737637/bafisqqblpyxx5lx91fx.jpg"}
            imageCapt={"CJ"}
            imagePosterId={"3"}
            imagePosterAviUrl={"https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589817904/bw2djxdddpa1mjpshity.jpg"}
            imagePosterUsername={"Username"}
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
