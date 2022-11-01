import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.scss'
//for font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
library.autoAddCss = false
library.add(fab, faEnvelope, faKey, faEye, faEyeSlash)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
