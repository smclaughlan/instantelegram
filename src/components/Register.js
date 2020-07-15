import React from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import "../css/register.css";
import { sendRegisterReq } from "../redux/user";

const Register = (props) => {
  const [registerData, setRegisterData] = React.useState({
    username: "",
    password: "",
    email: "",
    bio: "",
  });
  const [submitButtonEnabled, setSubmitButtonEnabled] = React.useState(false);

  const checkSubmitButton = () => {
    if (registerData.username.length > 0 && registerData.password.length > 0
      && registerData.email.length > 0) {
      setSubmitButtonEnabled(true);
    } else {
      setSubmitButtonEnabled(false);
    }
  }

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

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
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
          <div className="createAccount">
            {submitButtonEnabled ?
              <Button color="primary" type="submit">
                Submit
            </Button>
              :
              <Button color="primary" type="submit" disabled>
                Submit
            </Button>
            }
            <a href="/login">Already Have an Account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendRegisterReq: (...args) => dispatch(sendRegisterReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
