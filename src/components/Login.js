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
  };

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

  return (
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
            {loginButtonEnabled ? (
              <Button color="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Button color="primary" type="submit" disabled>
                Submit
              </Button>
            )}
            {props.errorMessage ? (
              <h3>Error: Invalid login credentials</h3>
            ) : (
              <></>
            )}
            <a href="/register">Create An Acount</a>
          </div>
        </form>
      </div>
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
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendLoginReq: (...args) => dispatch(sendLoginReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
