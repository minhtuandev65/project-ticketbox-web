import { SET_SEARCH_TEXT } from "../../../type/BuyerType/SearchType/SearchType";

const initialState = {
  listSearch: [],
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        listSearch: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
