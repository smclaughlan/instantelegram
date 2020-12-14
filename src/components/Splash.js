import React, {useState} from "react";

import Login from "./Login";
import Register from "./Register";
import '../css/splash.css';

export default function Splash() {
  const [isReg, setIsReg] = useState(false);

  return (
    <>
      <div className='splash-container'>
        <div className='splash-photos'>
          <img
            className='splash-image'
            src={"images/splash3.jpg"}
            style={{
              margin: "20 auto",
              borderRadius: "5px",
              maxWidth: "100%",
            }}
            alt='instantelegram_iphone'
          />
        </div>
        <div className='splash-register-form'>
          {isReg ? <Register setIsReg={setIsReg} /> : <Login setIsReg={setIsReg} />}
        </div>
      </div>
    </>
  );
}
