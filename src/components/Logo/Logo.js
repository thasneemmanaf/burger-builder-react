import React from "react";
import LogoImage from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";
import { checkPropTypes } from "prop-types";

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={LogoImage} alt="burger image"></img>
    </div>
  );
};

export default logo;
