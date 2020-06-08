import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField } from '@material-ui/core';

import { sendLoginReq, sendRegisterReq } from '../redux/user';

const Login = () => {
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  })

  return (
    <Container>
      <div>Username:</div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <div>Password:</div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" type="password" />
      <Button color="primary">Submit</Button>
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
    sendRegisterReq: (...args) => dispatch(sendRegisterReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Login
);
