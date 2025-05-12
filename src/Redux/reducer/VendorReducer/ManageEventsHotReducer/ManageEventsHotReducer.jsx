import { SET_LIST_EVENTS_HOT } from "../../../type/VendorType/EventsHot/EventsHot";

const initialState = {
  listEventsHot: [],
};

export const ManageEventsHotVendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_EVENTS_HOT: {
      return {
        ...state,
        listEventsHot: action.payload,
      };
    }
    default:
      return state;
  }
};
