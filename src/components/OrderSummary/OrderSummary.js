import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Button from "../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const orderList = Object.keys(this.props.ingredients).map((Igkey) => {
      return (
        <li key={Igkey}>
          <span style={{ textTransform: "capitalize" }}>{Igkey} </span>:{" "}
          {this.props.ingredients[Igkey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious Burger with the following ingredients</p>
        <ul>{orderList}</ul>
        <p>
          <strong>Total price : {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" btnOperation={this.props.cancelBtn}>
          CANCEL
        </Button>
        <Button btnType="Success" btnOperation={this.props.continueBtn}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
