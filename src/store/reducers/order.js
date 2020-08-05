import * as actionTypes from "../actions/actionTypes";

const initialState = {
  order: [],
  loading: false,
  purchasingDone: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.BURGER_ORDER_SUCCESS:
      const newOrderData = { ...action.order, id: action.orderId };
      return {
        ...state,
        loading: false,
        purchasingDone: true,
        order: state.order.concat(newOrderData),
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchasingDone: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
