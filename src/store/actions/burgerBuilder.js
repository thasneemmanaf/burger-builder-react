import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (IgName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: IgName,
  };
};

export const removeIngredient = (IgName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: IgName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};
//initially fetch ingredients from DB
export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-builder-f2594.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};

// to initialize purchasing state
export const puchasingInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

// AsynchronousTo fetch all orders from firebase and to update orders to  "My Order"
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios
      .get("/orders.json" + queryParams)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        if (fetchedOrders.length > 0) {
          dispatch(setOrders(fetchedOrders));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Synchronous
export const setOrders = (fetchedOrders) => {
  return {
    type: actionTypes.SET_ORDERS,
    orders: fetchedOrders,
  };
};
