
import {
  SET_GET_MY_LIST_ORDER,
  SET_GET_MY_LIST_ORDER_STATUS,
  SET_GET_MY_LIST_ORDER_DETAIL,
} from "../../../type/BuyerType/Orders/Orders";

const initialState = {
  myListOrder: [],
  myListOrderStatus: [],
  myListOrderDetail: [],
};

export const ManageOrdersBuyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_MY_LIST_ORDER: {
      return {
        ...state,
        myListOrder: action.payload,
      };
    }
    case SET_GET_MY_LIST_ORDER_STATUS: {
      return {
        ...state,
        myListOrderStatus: action.payload,
      };
    }
    case SET_GET_MY_LIST_ORDER_DETAIL: {
      return {
        ...state,
        myListOrderDetail: action.payload,
      };
    }
    default:
      return state;
  }
};
