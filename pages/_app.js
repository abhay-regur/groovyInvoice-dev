import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.scss'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
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
  const showNavbar = (router.pathname === '/login' || router.pathname === '/registration' || router.pathname === '/registration/success' || router.pathname === '/password/forgot' || router.pathname === '/password/reset') ? false : true;
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className='pageContent'>
        {showNavbar && <Navbar navExpandedState={navExpandedState} setNavExpandedState={setNavExpandedState} />}
        <Component {...pageProps} navExpandedState={navExpandedState} />
      </div>
      {showNavbar && <Footer />}

    </>
  );
}

export default MyApp
