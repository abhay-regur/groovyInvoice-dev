"use client"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { redirect } from 'next/navigation';
import NavExpandedState from '../../context/NavState.context';
import { isLoggedIn } from '../../services/auth.service';
import { Suspense } from 'react';
import Loading from './loading';

function Layout({ children }) {

    if (!isLoggedIn('user')) {
        redirect('/login')
    } else {
        return (
            <>
                <div className='pageContent'>
                    <NavExpandedState>
                        <Navbar />
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </NavExpandedState>
                </div>
                <Footer />
            </>)
    }

}

export default Layout;