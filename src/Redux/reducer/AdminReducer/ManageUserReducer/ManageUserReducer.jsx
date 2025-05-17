import {
  SET_GET_LIST_ALL_USERS,
  SET_GET_LIST_USERS_DETAIL,
  SET_BLOCK_USER,
  SET_UNLOCK_USER,
} from "../../../type/AdminType/User/User";

const initialState = {
  listAllUsers: [],
  userDetail: [],
};

export const ManageUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_ALL_USERS: {
      return { ...state, listAllUsers: action.payload };
    }
    case SET_GET_LIST_USERS_DETAIL: {
      return { ...state, userDetail: action.payload };
    }
    case SET_BLOCK_USER: {
      const { userId } = action.payload;
      const updatedUsers = state.usersList.map((user) =>
        user._id === userId ? { ...user } : user
      );
      return { ...state, listAllUsers: updatedUsers };
    }
    case SET_UNLOCK_USER: {
      const { userId } = action.payload;
      const updatedUsers = state.usersList.map((user) =>
        user._id === userId ? { ...user } : user
      );
      return { ...state, listAllUsers: updatedUsers };
    }
    default:
      return state;
  }
};
