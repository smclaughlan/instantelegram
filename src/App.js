import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import NavBar from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* <Route path="/register" component={Login} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
