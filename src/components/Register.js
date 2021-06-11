import React from "react";
import "../css/register.css";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="wrapper">
      <RegisterForm header="Create Account" />
    </div>
  );
};

export default Register;
