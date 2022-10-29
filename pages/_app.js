import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import '../styles/globals.scss'
//for font awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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
