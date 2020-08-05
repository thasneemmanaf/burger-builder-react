import React, { Component } from "react";
import CheckoutOrderSummary from "../../components/CheckoutOrderSummary/CheckoutOrderSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CheckOut extends Component {
  // below code is to extract ingredients from queryparams passed from BurgerBuilder.This will now be handled using redux
  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let totalPrice = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "totalPrice") {
  //       totalPrice = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  // }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingrs) {
      const redirectElement = this.props.purchasingDone ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {redirectElement}
          <CheckoutOrderSummary
            ingredients={this.props.ingrs}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.rootIngredient.ingredients,
    purchasingDone: state.rootOrder.purchasingDone,
  };
};

export default connect(mapStateToProps)(CheckOut);
