import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, path, currentUserId, exact, }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Component {...props} currentUserId={currentUserId} /> : <Redirect to="/login" />
      }
    />
  );
};

export const AuthRoute = ({ component: Component, path, currentUserId, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        // we can change this to redirect to feed as well
        currentUserId ? <Redirect to={`/profile/${currentUserId}`} /> : <Component {...props} />
      }
    />
  );
};
