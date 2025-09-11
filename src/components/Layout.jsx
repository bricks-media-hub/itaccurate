import React, { useEffect, useState } from "react";
import NavBar from "./HomePage/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./HomePage/Footer";
import ScrollToTop from "../lib/ScrollToTop";
import ChatBotWidget from "./ChatBot/ChatBotWidget";
import { MapContextProvider } from "../lib/MapContext";
import WhatsAppIcon from "./ContactUs/WhatsAppIcon";
import CallIcon from "./ContactUs/CallIcon";


function Layout() {
  const [activeLocation, setActiveLocation] = useState("nagpur");

  return (
    <div className="inset-0 w-full overflow-x-hidden md:overflow-visible">
      <MapContextProvider>
        <NavBar />
        <ScrollToTop />
        <Outlet />
        <Footer />
        {/* TODO */}
        {/* <ChatBotWidget /> */}
        <WhatsAppIcon />
        <CallIcon />
      </MapContextProvider>
    </div>
  );
}

export default Layout;
