import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  // to auto sign in after refreshing the application
  componentDidMount() {
    this.props.onAutoSigninCheck();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isSignedIn) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.rootAuth.tokenId != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSigninCheck: () => dispatch(actions.autoSignIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
