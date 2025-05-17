import { SET_SEARCH_TEXT } from "../../../type/BuyerType/SearchType/SearchType";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
import { search } from "../../../../Services/BuyerServices/Search/Search";
import { message } from "antd";

export const SearchTextAction = (searchText) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await search.searchText(searchText);
      dispatch({
        type: SET_SEARCH_TEXT,
        payload: result.data.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      message.error("Lỗi tìm kiếm", error);
    }
  };
};
