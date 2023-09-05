"use client"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { redirect } from 'next/navigation';
import NavExpandedState from '@/context/NavState.context';
import { isLoggedIn } from '@/services/auth.service';
import { Suspense, useContext, useEffect } from 'react';
import Loading from './loading';
import { UserLoggedState } from '@/context/UserState.context';
import { useRouter } from 'next/navigation';

function AuthLayout({ children }) {
    const router = useRouter()
    const { userLoggedState, setUserLoggedState } = useContext(UserLoggedState);
    useEffect(() => {
        const isUserLoggedIn = isLoggedIn('user');
        setUserLoggedState(isUserLoggedIn);
        if (!userLoggedState) {
            redirect('/login')
        }
    }, []);

    return (
        <><div className='pageContent'><NavExpandedState><Navbar /><Suspense fallback={<Loading />}>{children}</Suspense></NavExpandedState></div><Footer /></>
    )

}

export default AuthLayout;