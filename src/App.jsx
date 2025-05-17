// redux store
import { Provider } from "react-redux";
import { store } from "./Redux/configStore";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
// loading component
import Loading from "./Components/Loading/Loading";
// Login/Register page
import LoginPage from "./Pages/LoginPage/LoginPage";
import LoginTemplate from "./Template/LoginTemplate/LoginTemplate";
import RegisterTemplate from "./Template/RegisterTemplate/RegisterTemplate";
import RegisterBuyer from "./Pages/Buyer/RegisterBuyer/RegisterBuyer";
import RegisterVendor from "./Pages/Vendor/RegisterVendor/RegisterVendor";
// Xác thực tài khoản
import AccountVerification from "./Pages/VerifyEmail/AccountVerification";
// Lấy lại mật khẩu
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ChangeYourPassword from "./Pages/ChangeYourPassword/ChangeYourPassword";
// Import Myprofile
import MyProfile from "./Pages/MyProfile/MyProfile";
// Import vendor
import VendorTemplate from "./Template/VendorTemplate/VendorTemplate";
import EventsHotVendor from "./Pages/Vendor/EventsHot/EventsHotVendor";
import OrganizationVendor from "./Pages/Vendor/Organization/Organizationpage/OrganizationVendor";
import EventsVendor from "./Pages/Vendor/Events/EventsPage/EventsVendor";
import EventDetailPage from "./Pages/Vendor/Events/EventDetailPage/EventDetailPage";
// Import Admin
import AdminTemplate from "./Template/AdminTemplate/AdminTemplate";
import ManageEventsAdminPage from "./Pages/Admin/ManageEventsAdmin/ManageEventsAdminPage/ManageEventsAdminPage";
import ManageEventsHotAdminPage from "./Pages/Admin/ManageEventsHotAdmin/ManageEventsHotAdminPage/ManageEventsHotAdminPage";
import ManageEventDetailAdminPage from "./Pages/Admin/ManageEventsAdmin/ManageEventsDetailAdminPage/ManageEventsDetailAdminPage";
import ManageOrganizationAdminPage from "./Pages/Admin/ManageOrganizationAdmin/ManageOrganizationAdminPage/ManageOrganizationAdminPage";
import ManageUsersAdminPage from "./Pages/Admin/ManageUsersAdmin/ManageUsersAdminPage/ManageUsersAdminPage";
import ManageUsersAdminDetailPage from "./Pages/Admin/ManageUsersAdmin/ManageUsersAdminDetailPage/ManageUsersAdminDetailPage";
import HomeTemplate from "./Template/HomeTemplate/HomeTemplate";
import HomePage from "./Pages/Buyer/Home/HomePage/HomePage";
import CityCardList from "./Pages/Buyer/Home/CityCard/CityCardList/CityCardList";
import SearchPage from "./Pages/Buyer/SearchPage/SearchPage";
import EventDetaiUserlPage from "./Pages/Buyer/EventsDetail/EventsDetailPage/EventsDetailPage";
import OrderPage from "./Pages/Buyer/HistoryOrder/HistoryOrderPage/OrderPage";
import PaymentPage from "./Pages/Buyer/PaymentPage/PaymentPage";

// Vendor page
function AppEffects() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, [location, navigate]);
  return null;
}
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppEffects />
        <Loading />
        <Routes>
          {/* ROUTE LOGIN BUYER/VENDOR/ADMIN */}
          <Route path="/login" element={<LoginTemplate />}>
            {/* ROUTE LOGIN */}
            <Route index element={<LoginPage />} />
          </Route>
          {/* ROUTE REGISTER BUYER/VENDOR */}
          <Route path="/register" element={<RegisterTemplate />}>
            {/* ROUTE LOGIN */}
            <Route path="buyer" element={<RegisterBuyer />} />
            <Route path="vendor" element={<RegisterVendor />} />
          </Route>
          {/* ROUTE XÁC THỰC EMAIL */}
          <Route
            path="/account/verification"
            element={<AccountVerification />}
          />
          {/* ROUTE Lấy lại mật khẩu */}
          <Route path="/account" element={<RegisterTemplate />}>
            <Route path="fg-password" element={<ForgotPassword />} />
            <Route path="forgot_password" element={<ChangeYourPassword />} />
          </Route>
          {/* Admin services */}
          <Route path="/admin" element={<AdminTemplate />}>
            <Route index element={<ManageEventsAdminPage />} />
            <Route path="events" element={<ManageEventsAdminPage />} />
            <Route path="info" element={<MyProfile />} />
            <Route path="hot" element={<ManageEventsHotAdminPage />} />
            <Route
              path="events/detail/:eventId"
              element={<ManageEventDetailAdminPage />}
            />
            <Route
              path="organization"
              element={<ManageOrganizationAdminPage />}
            />
            <Route path="users" element={<ManageUsersAdminPage />} />
            <Route
              path="users/detail/:userId"
              element={<ManageUsersAdminDetailPage />}
            />
          </Route>
          {/* Vendor services */}
          <Route path="/vendor" element={<VendorTemplate />}>
            <Route index element={<EventsHotVendor />} />
            <Route path="events-hot" element={<EventsHotVendor />} />
            <Route path="info" element={<MyProfile />} />
            <Route path="events" element={<EventsVendor />} />
            <Route
              path="events/detail/:eventId"
              element={<EventDetailPage />}
            />
            <Route path="organization" element={<OrganizationVendor />} />
          </Route>
          {/* Buyer services */}
          <Route path="/home" element={<HomeTemplate />}>
            <Route index element={<HomePage />} />
            <Route path="city-list" element={<CityCardList />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="info" element={<MyProfile />} />
            <Route
              path="event/detail/:eventId"
              element={<EventDetaiUserlPage />}
            />
            <Route path="order" element={<OrderPage />} />
            <Route path="payment/:orderId" element={<PaymentPage />}/>
          </Route>
          {/* ROUTE KHÔNG KHỚP TRẢ VỀ HOME */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
