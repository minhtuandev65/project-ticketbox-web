import { SET_LIST_RATING } from "../../../type/VendorType/Ratings/Ratings";

const initialState = {
  listRating: [],
};

export const ManageRatingsVendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_RATING: {
      return {
        ...state,
        listRating: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
