import { SET_GET_LIST_REVENUE } from "../../../type/AdminType/Revenue/Revenue";

const initialState = {
  listRevenue: [],
};

export const ManageRevenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_REVENUE: {
      return { ...state, listRevenue: action.payload };
    }
    default:
      return state;
  }
};
