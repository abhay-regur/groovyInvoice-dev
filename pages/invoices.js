import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/invoice.module.scss';
import FaCirclePlus from "../assets/icons/faCirclePlus.svg";

export default function Invoices({ navExpandedState }) {
    return (<>
        <div className={styles.container}>
            <Head>
                <title>Groovy Invoice</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className={`${styles.comapnyInvoiceHeadingWrapper} row`}>
                    <div className="col-6">
                        <h2 className={`${styles.title}`}>
                            All Invoices
                        </h2>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button className="green align-content-center">
                            <FaCirclePlus />
                            Create Invoice
                        </button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">

                    </div>
                </div>
            </main>
        </div>
    </>)
}