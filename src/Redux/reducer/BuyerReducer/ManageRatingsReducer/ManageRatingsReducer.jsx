import { SET_GET_LIST_RATING } from "../../../type/BuyerType/Ratings/Ratings";

const initialState = {
  listRating: [],
};

export const ManageRatingsBuyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_RATING: {
      return {
        ...state,
        listRating: action.payload,
      };
    }
    default:
      return state;
  }
};
