import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact={true}>
        Burger Builder
      </NavigationItem>
      {props.isSignedIn ? (
        <NavigationItem link="/orders">My Orders</NavigationItem>
      ) : null}
      {props.isSignedIn ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Login</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
