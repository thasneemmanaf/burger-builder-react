import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Auxilliary";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let classList = [classes.SideDrawer, classes.Close].join(" ");
  if (props.show === true) {
    classList = [classes.SideDrawer, classes.Open].join(" ");
  }
  return (
    <Aux>
      <BackDrop show={props.show} closeBackdrop={props.clicked} />
      <div className={classList}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isSignedIn={props.isSignedIn} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
