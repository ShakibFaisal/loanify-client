import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      {/* Sticky Navbar */}
      <header className="sticky">
        
        <Navbar />
      </header>

      {/* Page content */}
      <main className="max-w-11/12 mx-auto">
        <Outlet />
      </main>
      <footer>
         <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
