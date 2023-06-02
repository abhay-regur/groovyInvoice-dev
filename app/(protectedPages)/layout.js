"use client"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import NavExpandedState from '../../context/NavState.context';

function Layout({ children }) {
    return (
        <>
            <div className='pageContent'>
                <NavExpandedState>
                    <Navbar />
                    {children}
                </NavExpandedState>
            </div>
            <Footer />
        </>)
}

export default Layout;