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
import VendorTemplate from "./Template/VendorTemplate/VendorTemplate";
import EventsHotVendor from "./Pages/Vendor/EventsHot/EventsHotVendor";
import MyProfile from "./Pages/MyProfile/MyProfile";
import OrganizationVendor from "./Pages/Vendor/Organization/Organizationpage/OrganizationVendor";
import EventsVendor from "./Pages/Vendor/Events/EventsPage/EventsVendor";
import EventDetailPage from "./Pages/Vendor/Events/EventDetailPage/EventDetailPage";
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

          {/* Vendor services */}
          <Route path="/vendor" element={<VendorTemplate />}>
            <Route index element={<EventsHotVendor />} />
            <Route path="events-hot" element={<EventsHotVendor />} />
            <Route path="info" element={<MyProfile />} />
            <Route path="organization" element={<OrganizationVendor />} />
            <Route path="events" element={<EventsVendor />} />
            <Route path="events/detail/:eventId" element={<EventDetailPage />} />
          </Route>
          {/* Buyer services */}

          {/* ROUTE KHÔNG KHỚP TRẢ VỀ HOME */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
