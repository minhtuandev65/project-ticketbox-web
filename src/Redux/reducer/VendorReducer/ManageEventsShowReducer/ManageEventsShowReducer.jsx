import { SET_LIST_SHOW_EVENTS } from "../../../type/VendorType/EventsShow/EventsShow";

const initialState = {
  listShowEvents: [],
};

export const ManageEventsShowVendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_SHOW_EVENTS: {
      return { ...state, payload: action.listShowEvents };
    }
    default:
      return state;
  }
};
