"use client"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { redirect } from 'next/navigation';
import NavExpandedState from '../../context/NavState.context';
import { isLoggedIn } from '../../services/auth.service';
import { Suspense, useContext, useEffect } from 'react';
import Loading from './loading';
import { UserLoggedState } from '../../context/UserState.context';

function AuthLayout({ children }) {
    const { userLoggedState, setUserLoggedState } = useContext(UserLoggedState);
    useEffect(() => {
        // console.log(userLoggedState);
        setUserLoggedState(isLoggedIn('user'));
    }, []);

    return (
        <>{
            !userLoggedState ? redirect('/login') : <><div className='pageContent'><NavExpandedState><Navbar /><Suspense fallback={<Loading />}>{children}</Suspense></NavExpandedState></div><Footer /></>
        }</>
    )

}

export default AuthLayout;