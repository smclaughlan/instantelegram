import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField } from '@material-ui/core';
import "../css/register.css";
import { sendLoginReq } from '../redux/user';

const Login = (props) => {
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  })

  const userNameChange = (event) => {
    setLoginData({ username: event.target.value });
    console.log(loginData);
  }

  const passwordChange = (event) => {
    setLoginData({ password: event.target.value });
  }

  const loginUser = () => {
    //redux
    props.sendLoginReq(/* Login info */)
  }

  return (
    // <Container>
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Log In</h1>
        <form>
          <div className="userName">
            <div>Username:</div>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={userNameChange}
            />
          </div>
          <div className="password">
            <div>Password:</div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              onChange={passwordChange}
            />
          </div>
          <div className="logIn">
            <Button color="primary" onSubmit={loginUser}>Submit</Button>
            <small>Create An Acount</small>
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
