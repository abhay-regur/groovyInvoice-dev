"use client"
import { useContext } from "react";
import Link from 'next/link';
import AllCustomerTable from '../../../components/allCustomerTable.js';
import FaCirclePlus from "../../../assets/icons/faCirclePlus.svg";
import styles from '../../../styles/customers.module.scss';
import { NavExpandedState } from '../../../context/NavState.context';


export default function CustomerListComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="container-fluid">
                    <div className={`${styles.comapnyInvoiceHeadingWrapper} row`}>
                        <div className="col-6">
                            <h2 className={`${styles.title}`}>
                                All Customers
                            </h2>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <Link href={'/customers/add'}>
                                <button className="green align-content-center">
                                    <FaCirclePlus />
                                    Add Customer
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-2'>
                        <AllCustomerTable />
                    </div>
                </div>
            </main>
        </div>
    )
}