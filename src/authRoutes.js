import React from "react";
import { Route, Redirect } from "react-router-dom";

//when user is logged in (currentUserId stored on local storage),
//they willl be redurect to the component in question
//if not, they will be redirected to the splash page to login/register
export const ProtectedRoute = ({
  component: Component,
  path,
  currentUserId,
  exact,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? (
          <Component {...props} currentUserId={currentUserId} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

//checks if the user is logged in, they will be redirected to the hoem page
//if not, they will be redirected tp the component in question
export const AuthRoute = ({
  component: Component,
  path,
  currentUserId,
  exact,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};
