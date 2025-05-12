import { SET_GET_ORGANIZATION } from "../../../type/VendorType/Organization/OrganizationType";

const initialState = {
  organization: null,
};

export const ManageOrganizationVendorReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_GET_ORGANIZATION: {
      return {
        ...state,
        organization: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
