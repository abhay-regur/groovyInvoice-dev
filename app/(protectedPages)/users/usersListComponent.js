"use client"
import Link from 'next/link';
import { useContext, Suspense } from 'react';
import FaCirclePlus from "../../../assets/icons/faCirclePlus.svg";
import styles from '../../../styles/user.module.scss';
import Loading from '../loading';
import { NavExpandedState } from '../../../context/NavState.context';
import dynamic from 'next/dynamic';

const AllUserTable = dynamic(
    () => import("../../../components/allUsersTable"),
    { ssr: false }
);

export default function UserListComponnt() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="container-fluid">
                    <div className={`${styles.comapnyInvoiceHeadingWrapper} row`}>
                        <div className="col-6">
                            <h2 className={`${styles.title}`}>
                                All Users
                            </h2>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <Link href={'/user/add'}>
                                <button className="green align-content-center">
                                    <FaCirclePlus />
                                    Add User
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-2'>
                        <Suspense fallback={<Loading />}>
                            <AllUserTable />
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    )
}