import {
  SET_GET_LIST_EVENTS,
  SET_GET_LIST_EVENTS_HOT,
  SET_GET_LIST_DETAIL_EVENTS,
} from "../../../type/BuyerType/Events/Events";

const initialState = {
  listEvents: [],
  listEventsHot: [],
  listDetailEvents: {},
};

export const ManageEventsBuyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_EVENTS: {
      return {
        ...state,
        listEvents: action.payload,
      };
    }
    case SET_GET_LIST_EVENTS_HOT: {
      return {
        ...state,
        listEventsHot: action.payload,
      };
    }
    case SET_GET_LIST_DETAIL_EVENTS: {
      return {
        ...state,
        listDetailEvents: action.payload,
      };
    }
    default:
      return state;
  }
};
