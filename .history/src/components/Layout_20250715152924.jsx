import React, { useState } from 'react'
import NavBar from './HomePage/Navbar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './HomePage/Footer'
import ScrollToTop from '../lib/ScrollToTop';
import ChatBotWidget from './ChatBot/ChatBotWidget';

function Layout() {
    const [activeLocation, setActiveLocation] = useState('nagpur');

    return (
        <>
            <NavBar />
            <ScrollToTop />
            <Outlet />
            <Footer 
                activeLocation={activeLocation} 
                setActiveLocation={setActiveLocation} 
            />
<<<<<<< HEAD
=======
            {/* TODO */}
>>>>>>> cf4e728fb3ff580b0e3a8e9ff3f5171ac4e808bd
            {/* <ChatBotWidget /> */}
        </>
    )
}

export default Layout
