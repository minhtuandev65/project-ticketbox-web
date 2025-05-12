import {
  SET_LIST_TICKET_SOLD,
  SET_LIST_TICKET_SOLD_BY_EVENT,
} from "../../../type/VendorType/Tickets/Tickets";

const initialState = {
  listTicketSold: [],
  listTicketSoldByEvent: [],
};

export const ManageTicketsVendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_TICKET_SOLD: {
      return {
        ...state,
        listTicketSold: action.payload,
      };
    }
    case SET_LIST_TICKET_SOLD_BY_EVENT: {
      return {
        ...state,
        listTicketSoldByEvent: action.payload,
      };
    }
    default:
      return state;
  }
};
