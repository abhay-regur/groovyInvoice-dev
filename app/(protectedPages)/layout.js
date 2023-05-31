"use client"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState } from 'react';
function Layout({ children }) {
    const [navExpandedState, setNavExpandedState] = useState(false);
    return (
        <>
            <div className='pageContent'>
                <Navbar navExpandedState={navExpandedState} setNavExpandedState={setNavExpandedState} />
                {children}
            </div>
            <Footer />
        </>)
}

export default Layout;