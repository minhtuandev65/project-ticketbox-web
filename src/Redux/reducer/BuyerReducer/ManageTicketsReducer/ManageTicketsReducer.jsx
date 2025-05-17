import {
  SET_GET_MY_LIST_TICKET,
  SET_GET_MY_LIST_TICKET_HISTORY,
} from "../../../type/BuyerType/Tickets/Tickets";

const initialState = {
  myListTicket: [],
  myListTicketHistory: [],
};

export const ManageTicketsBuyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_MY_LIST_TICKET: {
      return {
        ...state,
        myListTicket: action.payload,
      };
    }
    case SET_GET_MY_LIST_TICKET_HISTORY: {
      return {
        ...state,
        myListTicketHistory: action.payload,
      };
    }
    default:
      return state;
  }
};
