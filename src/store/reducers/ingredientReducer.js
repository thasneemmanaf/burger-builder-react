import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  orders: [],
  myOrdersLoading: true,
};

const INGREDIENT_PRICES = {
  cheese: 2,
  bacon: 1,
  meat: 3,
  salad: 5,
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
      };
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        // orders: state.orders.concat(action.orders),
        orders: action.orders,

        myOrdersLoading: false,
      };
    default:
      return state;
  }
};
export default ingredientReducer;
