import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// Import admin reducers
import { ManageEventsReducer } from "./reducer/AdminReducer/ManageEventsReducer/ManageEventsReducer";
import { ManageOrganizationReducer } from "./reducer/AdminReducer/ManageOrganizationReducer/ManageOrganizationReducer";
import { ManageRatingsReducer } from "./reducer/AdminReducer/ManageRatingsReducer/ManageRatingsReducer";
import { ManageRevenueReducer } from "./reducer/AdminReducer/ManageRevenueReducer/ManageRevenueReducer";
import { ManageUserReducer } from "./reducer/AdminReducer/ManageUserReducer/ManageUserReducer";
import { ManageEventsVendorReducer } from "./reducer/VendorReducer/ManageEventsReducer/ManageEventsReducer";
import { ManageEventsHotVendorReducer } from "./reducer/VendorReducer/ManageEventsHotReducer/ManageEventsHotReducer";
import { ManageEventsShowVendorReducer } from "./reducer/VendorReducer/ManageEventsShowReducer/ManageEventsShowReducer";
import { ManageRatingsVendorReducer } from "./reducer/VendorReducer/ManageRatingsReducer/ManageRatingsReducer";
import { ManageTicketsVendorReducer } from "./reducer/VendorReducer/ManageTIcketsReducer/ManageTIcketsReducer";
import { ManageEventsBuyerReducer } from "./reducer/BuyerReducer/ManageEventsReducer/ManageEventsReducer";
import { ManageTicketsBuyerReducer } from "./reducer/BuyerReducer/ManageTicketsReducer/ManageTicketsReducer";
import { ManageRatingsBuyerReducer } from "./reducer/BuyerReducer/ManageRatingsReducer/ManageRatingsReducer";
import { ManageUsersReducer } from "./reducer/ManageUsersReducer/ManageUsersReducer";
import { LoadingReducer } from "./reducer/LoadingReducer/LoadingReducer";
import { ManageOrganizationVendorReducer } from "./reducer/VendorReducer/ManageOrganizationReducer/ManageOrganizationReducer";

const rootReducer = combineReducers({
  // Loading reducer
  LoadingReducer,
  // Admin services
  ManageEventsReducer,
  ManageOrganizationReducer,
  ManageRatingsReducer,
  ManageRevenueReducer,
  ManageUserReducer,
  // Vendor services
  ManageEventsVendorReducer,
  ManageEventsHotVendorReducer,
  ManageEventsShowVendorReducer,
  ManageRatingsVendorReducer,
  ManageTicketsVendorReducer,
  ManageOrganizationVendorReducer,
  // Buyer services
  ManageEventsBuyerReducer,
  ManageTicketsBuyerReducer,
  ManageRatingsBuyerReducer,

  // User services
  ManageUsersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
