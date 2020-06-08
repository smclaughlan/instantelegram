import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField } from '@material-ui/core';

import { sendRegisterReq } from '../redux/user';

const Register = (props) => {
  const [registerData, setRegisterData] = React.useState({
    username: '',
    password: '',
    email: '',
    bio: '',
  })

  const userNameChange = (event) => {
    setRegisterData({ username: event.target.value });
  }

  const passwordChange = (event) => {
    setRegisterData({ password: event.target.value });
  }

  const emailChange = (event) => {
    setRegisterData({ email: event.target.value });
  }

  const bioChange = (event) => {
    setRegisterData({ bio: event.target.value });
  }

  const registerUser = () => {
    props.sendRegisterReq(/* Registration info */)
  }

  return (
    <Container>
      <div>Username:</div>
      <TextField id="outlined-basic" label="Username" variant="outlined" onChange={userNameChange} />
      <div>Email:</div>
      <TextField id="outlined-basic" label="Email" variant="outlined" onChange={emailChange} />
      <div>Bio:</div>
      <TextField id="outlined-basic" label="Bio" variant="outlined" onChange={bioChange} />
      <div>Password:</div>
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={passwordChange} />
      <Button color="primary" onSubmit={registerUser}>Submit</Button>
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
    sendRegisterReq: (...args) => dispatch(sendRegisterReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Register
);
