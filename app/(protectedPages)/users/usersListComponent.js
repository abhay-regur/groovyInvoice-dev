"use client"
import Link from 'next/link';
import { useContext, useState } from 'react';
import FaCirclePlus from "@/assets/icons/faCirclePlus.svg";
import styles from '@/styles/user.module.scss';
import { NavExpandedState } from '@/context/NavState.context';
import Breadcrumb from '@/components/common/breadcrumb';
import dynamic from 'next/dynamic';

const AllUserTable = dynamic(
    () => import("@/components/allUsersTable"),
    { ssr: false }
);

export default function UserListComponnt() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="breadcrumbWrapper">
                    <Breadcrumb styles={styles} />
                </div>
                <div className="container-fluid position-relative">

                    <div className={`${styles.comapnyInvoiceHeadingWrapper} row`}>
                        <div className="col-6">
                            <h2 className={`${styles.title}`}>
                                All Users
                            </h2>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <Link href={'/users/add'}>
                                <button className="green align-content-center">
                                    <FaCirclePlus />
                                    Add User
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-2'>
                        <AllUserTable />
                    </div>
                </div>
            </main>
        </div>
    )
}