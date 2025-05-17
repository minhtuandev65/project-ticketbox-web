import {
  SET_GET_LIST_EVENTS,
  SET_GET_LIST_EVENTS_HOT,
  SET_GET_LIST_DETAIL_EVENTS,
  SET_GET_LIST_CITY,
  SET_CARD_LIST,
} from "../../../type/BuyerType/Events/Events";

const initialState = {
  listEvents: [],
  listEventsHot: [],
  listDetailEvents: [],
  listCity: [],
  arrCardList: [],
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
    case SET_GET_LIST_CITY: {
      return {
        ...state,
        listCity: action.payload,
      };
    }
    case SET_CARD_LIST: {
      return {
        ...state,
        arrCardList: action.payload,
      };
    }
    default:
      return state;
  }
};
