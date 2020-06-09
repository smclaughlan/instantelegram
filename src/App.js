import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import NavBar from './components/Nav';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile/:userid" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
