import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import MobileTabBar from "../components/MobileTabBar";
import BackToTop from "../components/BackToTop";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <MobileTabBar />
      <Footer />
      <BackToTop />
    </>
  );
};

export default MainLayout;
