import {
  SET_GET_LIST_ORGANIZATION,
  SET_ACTIVATE_ORGANIZATION,
  SET_REJECT_ORGANIZATION,
} from "../../../type/AdminType/Organization/Organization";

const initialState = {
  listOrganization: [],
};

export const ManageOrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_ORGANIZATION: {
      return {
        ...state,
        listOrganization: action.payload,
      };
    }
    case SET_ACTIVATE_ORGANIZATION: {
      const { orgId } = action.payload;
      const updated = state.organizationList.map((org) =>
        org._id === orgId ? { ...org, status: "ACTIVE" } : org
      );
      return {
        ...state,
        listOrganization: updated,
      };
    }
    case SET_REJECT_ORGANIZATION: {
      const { orgId } = action.payload;
      const updated = state.organizationList.map((org) =>
        org._id === orgId ? { ...org, status: "REJECTED" } : org
      );
      return {
        ...state,
        listOrganization: updated,
      };
    }
    default:
      return state;
  }
};
