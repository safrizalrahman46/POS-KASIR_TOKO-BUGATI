import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AppLayout from "./layout/AppLayout";
import POSLayout from "./layouts/POSLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

// POS pages
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import POSPage from "./pages/POSPage";
import MirrorDisplayPage from "./pages/MirrorDisplayPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

// Admin pages
import DashboardPage from "./pages/admin/DashboardPage";
import ProductPage from "./pages/admin/ProductPage";
import CategoryPage from "./pages/admin/CategoryPage";
import VoucherPage from "./pages/admin/VoucherPage";
import UserPage from "./pages/admin/UserPage";
import AutoDiscountPage from "./pages/admin/AutoDiscountPage";
import PromoPage from "./pages/admin/PromoPage";
import ReportPage from "./pages/admin/ReportPage";
import CustomerPage from "./pages/admin/CustomerPage";
import StoreSettingsPage from "./pages/admin/StoreSettingsPage";

// Auth pages
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// TailAdmin existing pages
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import UserProfiles from "./pages/UserProfiles";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import NotFound from "./pages/OtherPage/NotFound";

function HomeRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user) {
    return user.role === 'admin' || user.role === 'superadmin' ? <Navigate to="/admin" replace /> : <Navigate to="/pos" replace />;
  }
  return <LandingPage />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mirror" element={<MirrorDisplayPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Auth routes (standalone, not layout routes) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* POS routes (custom layout, no sidebar) */}
        <Route element={<POSLayout />}>
          <Route path="/pos" element={
            <ProtectedRoute permission="pos"><POSPage /></ProtectedRoute>
          } />
        </Route>

        {/* Admin routes (TailAdmin layout with sidebar) */}
        <Route element={<AppLayout />}>
          <Route path="/admin" element={
            <ProtectedRoute permission="dashboard"><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute permission="products"><ProductPage /></ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute permission="categories"><CategoryPage /></ProtectedRoute>
          } />
          <Route path="/admin/vouchers" element={
            <ProtectedRoute permission="vouchers"><VoucherPage /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute permission="users"><UserPage /></ProtectedRoute>
          } />
          <Route path="/admin/customers" element={
            <ProtectedRoute permission="customers"><CustomerPage /></ProtectedRoute>
          } />
          <Route path="/admin/auto-discounts" element={
            <ProtectedRoute permission="auto_discounts"><AutoDiscountPage /></ProtectedRoute>
          } />
          <Route path="/admin/promos" element={
            <ProtectedRoute permission="promos"><PromoPage /></ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute permission="reports"><ReportPage /></ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute permission="settings"><StoreSettingsPage /></ProtectedRoute>
          } />

          {/* Existing TailAdmin routes */}
          <Route path="/blank" element={<Blank />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
