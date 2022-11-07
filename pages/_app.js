import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.scss'
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
//for font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
library.autoAddCss = false
library.add(fab, faEnvelope, faKey, faEye, faEyeSlash);



function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const showNavbar = router.pathname === ('/login' || '/registration') ? false : true;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='pageContent'>
        {showNavbar && <Navbar />}
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp
