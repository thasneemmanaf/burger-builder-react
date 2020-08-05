import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authLoading: false,
  tokenId: null,
  userId: null,
  error: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        authLoading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authLoading: false,
        tokenId: action.idToken,
        userId: action.localId,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        authLoading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        tokenId: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
