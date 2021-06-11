import React from "react";
import { motion } from "framer-motion";

import RegisterForm from "./RegisterForm";
import { pageVariants } from "../App";
import "../css/splash.css";

export default function Splash() {
  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariants}
      className="motion-div"
    >
      <div className="splash-container">
        <div className="splash-photos">
          <img
            className="splash-image"
            src={"images/splash3.jpg"}
            style={{
              margin: "20 auto",
              borderRadius: "5px",
              maxWidth: "100%",
            }}
            alt="splash"
          />
        </div>
        <div className="splash-register-form">
          <RegisterForm />
        </div>
      </div>
    </motion.div>
  );
}
