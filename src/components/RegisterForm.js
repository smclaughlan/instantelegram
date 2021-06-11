import React from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import "../css/registerForm.css";
import { sendLoginReq } from "../redux/user";
import { sendRegisterReq } from "../redux/user";

const RegisterForm = (props) => {
  const [registerData, setRegisterData] = React.useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    bio: "",
  });
  const [submitButtonEnabled, setSubmitButtonEnabled] = React.useState(false);

  const checkSubmitButton = () => {
    if (
      registerData.username.length > 0 &&
      registerData.password.length > 0 &&
      registerData.email.length > 0 &&
      registerData.email.indexOf("@") !== -1 &&
      registerData.email.indexOf(".") !== -1
    ) {
      setSubmitButtonEnabled(true);
    } else {
      setSubmitButtonEnabled(false);
    }
  };

  const userNameChange = (event) => {
    setRegisterData({
      ...registerData,
      username: event.target.value,
    });
    checkSubmitButton();
  };

  const passwordChange = (event) => {
    setRegisterData({
      ...registerData,
      password: event.target.value,
    });
    checkSubmitButton();
  };

  const checkPasswordMatch = (event) => {
    setRegisterData({
      ...registerData,
      passwordConfirm: event.target.value,
    });
    checkSubmitButton();
  };

  const emailChange = (event) => {
    setRegisterData({
      ...registerData,
      email: event.target.value,
    });
    checkSubmitButton();
  };

  const bioChange = (event) => {
    setRegisterData({
      ...registerData,
      bio: event.target.value,
    });
  };

  const registerUser = (e) => {
    e.preventDefault();
    props.sendRegisterReq(registerData);
  };

  const loginDemo = (e) => {
    e.preventDefault();
    props.sendLoginReq({
      username: "Guest",
      password: "password",
    });
  };

  return (
    <>
      <div className="form-wrapper">
        <h1 className="header">
          {props.header ? props.header : "Instantelegram"}
        </h1>
        <form onSubmit={registerUser}>
          <div className="userName">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={userNameChange}
            />
          </div>
          <div className="email">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={emailChange}
            />
          </div>
          <div className="bio">
            <TextField
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              onChange={bioChange}
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
          <div className="password">
            <TextField
              id="outlined-basic"
              label={
                registerData.password &&
                registerData.passwordConfirm &&
                registerData.password !== registerData.passwordConfirm
                  ? "Passwords do not match"
                  : "Confirm Password"
              }
              variant="outlined"
              type="password"
              onChange={checkPasswordMatch}
              error={
                registerData.password &&
                registerData.passwordConfirm &&
                registerData.password !== registerData.passwordConfirm
              }
            />
          </div>
          {props.errorMessage ? <h3>{props.errorMessage}</h3> : <></>}
          <div className="createAccount">
            {submitButtonEnabled ? (
              <Button color="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Button color="primary" type="submit" disabled>
                Submit
              </Button>
            )}
            <Button color="primary" onClick={loginDemo}>
              Demo Login
            </Button>
            <a href="/login">Already Have an Account?</a>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  if (state && state.user && state.user.error && state.user.error.register) {
    return {
      token: state.user.token,
      errorMessage: state.user.error.register,
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
    sendRegisterReq: (...args) => dispatch(sendRegisterReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
