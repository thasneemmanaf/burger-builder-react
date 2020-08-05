import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../.././Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle toggleDrawer={props.toggleDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isSignedIn={props.isSignedIn} />
      </nav>
    </header>
  );
};

export default toolbar;
