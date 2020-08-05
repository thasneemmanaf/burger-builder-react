import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const burgerOrderSuccess = (orderId, order) => {
  return {
    type: actionTypes.BURGER_ORDER_SUCCESS,
    orderId: orderId,
    order: order,
  };
};

export const setLoading = () => {
  return {
    type: actionTypes.SET_LOADER,
  };
};

export const postBurgerOrder = (order, token) => {
  return (dispatch) => {
    dispatch(setLoading());
    axios
      .post("/orders.json?auth=" + token, order)
      .then((response) => {
        dispatch(burgerOrderSuccess(response.data.name, order));
      })
      .catch((error) => console.log(error));
  };
};
