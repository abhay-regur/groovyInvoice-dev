"use client"

import { useContext, useState } from "react";
import styles from '@/styles/notification.module.scss';

import { NavExpandedState } from '@/context/NavState.context';
import NotificationCard from "@/components/notification/notificationCard";


export default function NotificationComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const [currentnotificationData, setCurrentNotificationData] = useState([
        { title: 'Notification 1', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '20:11' },
        { title: 'Notification 2', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '20:11' },
        { title: 'Notification 3', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '18:26' },
        { title: 'Notification 4', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '14:56' },
        { title: 'Notification 5', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '14:06' },
        { title: 'Notification 6', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '09:15' }
    ])

    const [notificationData, setNotificationData] = useState([
        { title: 'Notification 1', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '20:11' },
        { title: 'Notification 2', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '20:11' },
        { title: 'Notification 3', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '18:26' },
        { title: 'Notification 4', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '14:56' },
        { title: 'Notification 5', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '14:06' },
        { title: 'Notification 6', discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero et in, animi esse nam asperiores.', time: '09:15' }
    ])


    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="container-fluid">
                    <div className={`${styles.comapnyNotificationHeadingWrapper} row`}>
                        <div className="col-12">
                            <h2 className={`${styles.title}`}>
                                Notifications
                            </h2>
                        </div>
                    </div>

                    <div className={`${styles.companyInvoiceTimeHeaderWrapper}`}>
                        <h4>Today</h4>
                        <hr />
                    </div>
                    <div className="row">
                        {
                            currentnotificationData.map(function (elem, idx) {
                                return (
                                    <div key={idx} className="col-10 mb-3">
                                        <NotificationCard idx={idx} data={elem} styles={styles} />
                                    </div>
                                )

                            })
                        }
                    </div>
                    <div className={`${styles.companyInvoiceTimeHeaderWrapper}`}>
                        <h4>Yesterday</h4>
                        <hr />
                    </div>
                    <div className="row">
                        {
                            notificationData.map(function (elem, idx) {
                                return (
                                    <div key={idx} className="col-10 mb-3">
                                        <NotificationCard idx={idx} data={elem} styles={styles} />
                                    </div>
                                )

                            })
                        }
                    </div>
                    <div className={`${styles.companyInvoiceTimeHeaderWrapper}`}>
                        <h4>Older</h4>
                        <hr />
                    </div>
                    <div className="row">
                        {
                            notificationData.map(function (elem, idx) {
                                return (
                                    <div key={idx} className="col-10 mb-3">
                                        <NotificationCard idx={idx} data={elem} styles={styles} />
                                    </div>
                                )

                            })
                        }
                    </div>

                </div>
            </main>
        </div>
    )
}