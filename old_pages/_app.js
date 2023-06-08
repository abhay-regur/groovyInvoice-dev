import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.scss'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Toast from '../components/toast';
//for font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

library.autoAddCss = false
library.add(fab, faEnvelope, faKey, faEye, faEyeSlash);
//end for font awesome



function MyApp({ Component, pageProps }) {

  const [navExpandedState, setNavExpandedState] = useState();
  useEffect(() => {
    var navState = window.localStorage.navExpandedState;
    if (navState != undefined) {
      setNavExpandedState(false);
    }

    // Initalize Google API's

  }, [])

  useEffect(() => {
    window.localStorage.setItem('navExpandedState', JSON.stringify(navExpandedState));
  }, [navExpandedState]);

  const router = useRouter();
  const [list, setList] = useState([]);
  const [successMessage, setSuccessMessage] = useState({
    message: '',
    subHeading: '',
    showLink: true,
  });
  const showNavbar = (router.pathname === '/login' || router.pathname === '/registration' || router.pathname === '/registration/success' || router.pathname === '/registration/verify-email' || router.pathname === '/password/forgot' || router.pathname === '/password/forgot/success' || router.pathname === '/password/reset' || router.pathname === '/password/reset/success' || router.pathname === '/password/success' || router.pathname === '/password/success' || router.pathname === '/registration/success') ? false : true;
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className='pageContent'>
        {showNavbar && <Navbar navExpandedState={navExpandedState} setNavExpandedState={setNavExpandedState} />}
        <Component {...pageProps} navExpandedState={navExpandedState} setList={setList} message={successMessage} setMessage={setSuccessMessage} />
        <Toast
          toastList={list}
          autoDeleteTime={5000}
        />
      </div>
      {showNavbar && <Footer />}

    </>
  );
}

export default MyApp
