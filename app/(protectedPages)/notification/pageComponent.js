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

                    <div className="accordion accordion-flush" id="accordionNotification">
                        <div className={` ${styles.comapnyNotificationAccordianMain} accordion-item`}>
                            <h2 className={`${styles.companyInvoiceTimeHeaderWrapper} accordion-header d-flex align-items-center`} id="accordionNotificationTodayHeader">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionNotificationTodayContainer" aria-expanded="false" aria-controls="accordionNotificationTodayContainer">
                                    Today
                                    <span className="badge rounded-pill ms-3">{currentnotificationData.length}</span>
                                </button>
                            </h2>
                            <div id="accordionNotificationTodayContainer" className="accordion-collapse collapse pt-5 show" aria-labelledby="accordionNotificationTodayHeader" data-bs-parent="#accordionNotificationTodayHeader">
                                {
                                    currentnotificationData.map(function (elem, idx) {
                                        return (
                                            <div key={idx} className="col-12 mb-3">
                                                <NotificationCard idx={idx} data={elem} styles={styles} />
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                        <div className={`${styles.comapnyNotificationAccordianMain} accordion-item`}>
                            <h2 className={`${styles.companyInvoiceTimeHeaderWrapper} accordion-header d-flex align-items-center`} id="accordionNotificationYesterdayHeader">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionNotificationYesterdayContainer" aria-expanded="false" aria-controls="accordionNotificationYesterdayContainer">
                                    Yesterday
                                    <span className="badge rounded-pill ms-3">{notificationData.length}</span>
                                </button>
                            </h2>
                            <div id="accordionNotificationYesterdayContainer" className="accordion-collapse collapse pt-5" aria-labelledby="accordionNotificationYesterdayHeader" data-bs-parent="#accordionNotificationYesterdayHeader">
                                {
                                    notificationData.map(function (elem, idx) {
                                        return (
                                            <div key={idx} className="col-12 mb-3">
                                                <NotificationCard idx={idx} data={elem} styles={styles} />
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                        <div className={`${styles.comapnyNotificationAccordianMain} accordion-item`}>
                            <h2 className={`${styles.companyInvoiceTimeHeaderWrapper} accordion-header d-flex align-items-center`} id="accordionNotificationOlderHeader">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionNotificationOlderContainer" aria-expanded="false" aria-controls="accordionNotificationOlderContainer">
                                    Older
                                    <span className="badge rounded-pill ms-3">{notificationData.length}</span>
                                </button>
                            </h2>
                            <div id="accordionNotificationOlderContainer" className="accordion-collapse collapse pt-5" aria-labelledby="accordionNotificationOlderHeader" data-bs-parent="#accordionNotificationOlderHeader">
                                {
                                    notificationData.map(function (elem, idx) {
                                        return (
                                            <div key={idx} className="col-12 mb-3">
                                                <NotificationCard idx={idx} data={elem} styles={styles} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}