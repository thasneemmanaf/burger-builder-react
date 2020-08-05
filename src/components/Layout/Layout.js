import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    sideDrawerStatus: false,
  };

  sideDrawerStatusHandler = () => {
    this.setState({ sideDrawerStatus: false });
  };

  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return { sideDrawerStatus: !prevState.sideDrawerStatus };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          toggleDrawer={this.toggleSideDrawer}
          isSignedIn={this.props.isSignedIn}
        />
        <SideDrawer
          show={this.state.sideDrawerStatus}
          clicked={this.sideDrawerStatusHandler}
          isSignedIn={this.props.isSignedIn}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.rootAuth.tokenId ? true : false,
  };
};
export default connect(mapStateToProps)(Layout);
