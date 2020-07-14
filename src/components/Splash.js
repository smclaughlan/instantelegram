import React from "react";

import RegisterForm from "./RegisterForm";
import '../css/splash.css';

export default function Splash() {

  return (
    <>
      <div className='splash-container'>
        <div className='splash-photos'>
          <container>
            <img
              className='splash-image'
              src={"images/splash3.jpg"}
              style={{
                margin: "20 auto",
                borderRadius: "5px",
                maxWidth: "100%",
              }}
            />
          </container>
        </div>
        <div className='splash-register-form'>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
