import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import "../css/register.css";
import { sendLoginReq } from '../redux/user';

const Login = (props) => {
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  })

  const userNameChange = (event) => {
    setLoginData({
      ...loginData,
      username: event.target.value
    });
  }

  const passwordChange = (event) => {
    setLoginData({
      ...loginData,
      password: event.target.value
    });
  }

  const loginUser = (e) => {
    e.preventDefault()
    props.sendLoginReq(loginData);
  }

  const loginDemo = (e) => {
    e.preventDefault()
    setLoginData({
      username: 'Guest',
      password: 'password'
    })
    props.sendLoginReq(loginData);
  }

  return (
    // <Container>
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Log In</h1>
        <form onSubmit={loginUser}>
          <div className="userName">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={userNameChange}
            />
          </div>
          <div className="password">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              onChange={passwordChange}
            />
          </div>
          <div className="logIn">
            <Button color="primary" onClick={loginDemo}>Demo Login</Button>
            <Button color="primary" type='submit'>Submit</Button>
            <a href="/register">Create An Acount</a>
          </div>
        </form>
      </div>
    </div>
    // </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLoginReq: (...args) => dispatch(sendLoginReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Login
);
