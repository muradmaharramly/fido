import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import AboutUs from "./pages/AboutUs";
import DeliveryandBilling from "./pages/DeliveryandBilling";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import NotFoundPage from "./pages/NotFoundPage";
import NewsDetails from "./pages/NewsDetails";
import NewsAndBlogs from "./pages/NewsAndBlogs";
import Products from "./pages/Products";
import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails";
import ScrollToTop from "./components/ScrollToTop";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardPage from "./components/Dashboard/pages/DashboardPage";
import AdminProducts from "./components/Dashboard/pages/AdminProducts";
import AdminNews from "./components/Dashboard/pages/AdminNews";
import AdminCampaigns from "./components/Dashboard/pages/AdminCampaigns";
import Administrators from "./components/Dashboard/pages/Administrators";
import AddProduct from "./components/Dashboard/pages/AddProduct";
import EditProduct from "./components/Dashboard/pages/EditProduct";
import AddNews from "./components/Dashboard/pages/AddNews";
import EditNews from "./components/Dashboard/pages/EditNews";
import AddCampaign from "./components/Dashboard/pages/AddCampaign";
import EditCampaign from "./components/Dashboard/pages/EditCampaign";
import AddAdministrator from "./components/Dashboard/pages/AddAdministrator";
import EditAdministrator from "./components/Dashboard/pages/EditAdministrator";
import AdministratorLogin from "./components/Dashboard/auth/AdministratorLogin";
import AdministratorProfile from "./components/Dashboard/pages/AdministratorProfile";
import ProtectedRoute from "./components/Dashboard/auth/ProtectRoute";
import CampaignPopup from "./components/CampaignPopup";
import FAQPage from "./pages/Faq";
import Checkout from "./pages/CheckOut";

const App = () => {
  return (
    <BrowserRouter>
    <CampaignPopup />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/delivery-and-billing" element={<DeliveryandBilling />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/news" element={<NewsAndBlogs />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:slug" element={<CampaignDetails />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/administrative/auth/login" element={<AdministratorLogin />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/administrative/*" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/addproduct" element={<AddProduct />} />
            <Route path="products/editproduct/:slug" element={<EditProduct />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="news/addnews" element={<AddNews />} />
            <Route path="news/editnews/:slug" element={<EditNews />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="campaigns/addcampaign" element={<AddCampaign />} />
            <Route path="campaigns/editcampaign/:slug" element={<EditCampaign />} />
            <Route path="administrators" element={<Administrators />} />
            <Route path="administrators/addadministrator" element={<AddAdministrator />} />
            <Route path="administrators/editadministrator/:slug" element={<EditAdministrator />} />
            <Route path="profile" element={<AdministratorProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
