import {
  SET_APPROVE_EVENT,
  SET_REJECT_EVENT,
  SET_LIST_EVENTS_ALL,
  SET_LIST_EVENTS_HOT,
  SET_LIST_DETAIL_EVENTS,
} from "../../../type/AdminType/Events/Events";

const initialState = {
  listEventsAll: [],
  listEventsHot: [],
  listDetailEvents: {},
};

export const ManageEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPROVE_EVENT: {
      const { eventId } = action.payload;
      const updated = state.listEventsAll.map((event) => {
        event.id === eventId ? { ...event, status: "APPROVED" } : event;
      });
      return {
        ...state,
        listEventsAll: updated,
      };
    }
    case SET_REJECT_EVENT: {
      const { eventId } = action.payload;
      const updated = state.listEventsAll.map((event) => {
        event.id === eventId ? { ...event, status: "CANCELLED" } : event;
      });
      return {
        ...state,
        listEventsAll: updated,
      };
    }
    case SET_LIST_EVENTS_ALL: {
      return {
        ...state,
        listEventsAll: action.payload,
      };
    }
    case SET_LIST_EVENTS_HOT: {
      return {
        ...state,
        listEventsHot: action.payload,
      };
    }
    case SET_LIST_DETAIL_EVENTS: {
      return {
        ...state,
        listDetailEvents: action.payload,
      };
    }
    default:
      return state;
  }
};
