import {
  SET_GET_MY_LIST_ORDER,
  SET_GET_MY_LIST_ORDER_HISTORY,
} from "../../../type/BuyerType/Tickets/Tickets";

const initialState = {
  myListOrder: [],
  myListOrderHistory: [],
};

export const ManageTicketsBuyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_MY_LIST_ORDER: {
      return {
        ...state,
        myListOrder: action.payload,
      };
    }
    case SET_GET_MY_LIST_ORDER_HISTORY: {
      return {
        ...state,
        myListOrderHistory: action.payload,
      };
    }
    default:
      return state;
  }
};
