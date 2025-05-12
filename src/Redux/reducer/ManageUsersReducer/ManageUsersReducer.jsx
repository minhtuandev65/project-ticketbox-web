import {
  SET_USER_LOGIN,
  SET_USER_PROFILE,
} from "../../type/UsersType/UsersType";
const userFromStorage = localStorage.getItem("USER_LOGIN");
const initialState = {
  userLogin: userFromStorage ? JSON.parse(userFromStorage) : null,
  userProfile: null,
};

export const ManageUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN: {
      return { ...state, userLogin: action.payload };
    }
    case SET_USER_PROFILE: {
      return { ...state, userProfile: action.payload };
    }
    default: {
      return state; // Trả về state mặc định nếu action không khớp
    }
  }
};
