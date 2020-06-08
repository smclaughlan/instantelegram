import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField } from '@material-ui/core';

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
    <Container>
      <div>Username:</div>
      <TextField id="outlined-basic" label="Username" variant="outlined" onChange={userNameChange} />
      <div>Password:</div>
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={passwordChange} />
      <Button color="primary" onSubmit={loginUser}>Submit</Button>
    </Container>
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
