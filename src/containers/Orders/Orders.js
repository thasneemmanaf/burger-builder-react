import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  // fetch order details from firebase
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let myOrdersOutput = (
      <div>
        {this.props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              totalPrice={order.price}
            />
          );
        })}
      </div>
    );
    if (this.props.myOrdersLoading) {
      myOrdersOutput = <Spinner />;
    }

    return myOrdersOutput;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.rootIngredient.orders,
    myOrdersLoading: state.rootIngredient.myOrdersLoading,
    token: state.rootAuth.tokenId,
    userId: state.rootAuth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
