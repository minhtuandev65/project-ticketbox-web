import {
  SET_LIST_EVENTS,
  SET_LIST_DETAIL_EVENTS,
  SET_ONE_DETAIL_EVENT,
} from "../../../type/VendorType/Events/Events";

const initialState = {
  listEvents: [],
  listDetailEvents: [],
  detailEvent: {},
};

export const ManageEventsVendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_EVENTS: {
      return {
        ...state,
        listEvents: action.payload,
      };
    }

    case SET_LIST_DETAIL_EVENTS: {
      return {
        ...state,
        listDetailEvents: action.payload,
      };
    }
    case SET_ONE_DETAIL_EVENT: {
      return {
        ...state,
        detailEvent: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
