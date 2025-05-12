import {
  SET_GET_LIST_RATINGS,
  SET_REMOVE_RATINGS,
  SET_GET_LIST_RATINGS_REPORT,
} from "../../../type/AdminType/Ratings/Ratings";

const initialState = {
  listRatings: [],
  listRatingsReport: [],
};

export const ManageRatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_RATINGS: {
      return { ...state, listRatings: action.payload };
    }
    case SET_REMOVE_RATINGS: {
      const { ratingId } = action.payload;
      const updatedRating = state.ratingList.map((rating) =>
        rating._id === ratingId ? { ...rating } : rating
      );
      return {
        ...state,
        listRatings: updatedRating,
      };
    }
    case SET_GET_LIST_RATINGS_REPORT: {
      return { ...state, listRatingsReport: action.payload };
    }
    default:
      return state;
  }
};
