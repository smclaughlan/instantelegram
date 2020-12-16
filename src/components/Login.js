import React from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import "../css/register.css";
import { sendLoginReq } from "../redux/user";

const Login = (props) => {
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const [loginButtonEnabled, setLoginButtonEnabled] = React.useState(false);

  const checkLoginButton = () => {
    if (loginData.username.length > 0 && loginData.password.length > 0) {
      setLoginButtonEnabled(true);
    } else {
      setLoginButtonEnabled(false);
    }
  }

  const userNameChange = (event) => {
    setLoginData({
      ...loginData,
      username: event.target.value,
    });
    checkLoginButton();
  };

  const passwordChange = (event) => {
    setLoginData({
      ...loginData,
      password: event.target.value,
    });
    checkLoginButton();
  };

  const loginUser = (e) => {
    e.preventDefault();
    props.sendLoginReq(loginData);
  };

  const loginDemo = (e) => {
    e.preventDefault()
    props.sendLoginReq({
      username: 'Guest',
      password: 'password'
    });
  }

  return (
    <div className="form-wrapper">
        <h1>Log In</h1>
        <form onSubmit={loginUser}>
          {props.errorMessage ?
              <h3 className="errors">{props.errorMessage}</h3>
            :
              <></>
          }
          <div className="userName">
            <TextField
              label="Username"
              variant="outlined"
              onChange={userNameChange}
            />
          </div>
          <div className="password">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              onChange={passwordChange}
            />
          </div>
          <div className="logIn">

            <Button color="primary" onClick={loginDemo}>Demo Login</Button>
            {loginButtonEnabled ?
              <Button color="primary" type='submit'>Submit</Button>
              :
              <Button color="primary" type='submit' disabled>Submit</Button>
            }
            <input
              type='button'
              onClick={()=>{props.setIsReg(true)}}
              value='Create an Account'
            />
          </div>
        </form>
      </div>
  );
};

const mapStateToProps = (state) => {
  if (state && state.user && state.user.error && state.user.error.login) {
    return {
      token: state.user.token,
      errorMessage: state.user.error.login,
    };
  } else {
    return {
      token: state.user.token,
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendLoginReq: (...args) => dispatch(sendLoginReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
