"use client"

import { useContext, useState } from "react";
import styles from '@/styles/notification.module.scss';
import FaXmark from '@/assets/icons/faXmark.svg';
import { NavExpandedState } from '@/context/NavState.context';


export default function NotificationComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const [notificationData, setnotificationData] = useState([
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
                            notificationData.map(function (elem, idx) {
                                return (
                                    <div key={idx} className="col-10 mb-3">
                                        <div className={`${styles.comapnyNotificationMainCard} card text-left`} data-delay={idx}>
                                            <div className="card-body">
                                                <div className={`${styles.notificationMain} row`}>
                                                    <div className='col-11'>
                                                        <div className={`${styles.notificationInnerWrapper}`}>
                                                            <p className={`${styles.notificationTitle}`}>{elem.title} </p>
                                                            <p className={`${styles.notificationMessage}`}>
                                                                {elem.discription}
                                                            </p>
                                                            <span className={`${styles.companyNotificationTime} text-end`}>{elem.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-1 d-flex">
                                                        <button onClick={() => console.log('delete')}>
                                                            <FaXmark />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <div className={`${styles.comapnyNotificationMainCard} card text-left`} data-delay={idx}>
                                            <div className="card-body">
                                                <div className={`${styles.notificationMain} row`}>
                                                    <div className='col-11'>
                                                        <p className={`${styles.notificationTitle}`}>{elem.title}</p>
                                                        <p className={`${styles.notificationMessage}`}>
                                                            {elem.discription}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 d-flex">
                                                        <button onClick={() => console.log('delete')}>
                                                            <FaXmark />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <div className={`${styles.comapnyNotificationMainCard} card text-left`} data-delay={idx}>
                                            <div className="card-body">
                                                <div className={`${styles.notificationMain} row`}>
                                                    <div className='col-11'>
                                                        <p className={`${styles.notificationTitle}`}>{elem.title}</p>
                                                        <p className={`${styles.notificationMessage}`}>
                                                            {elem.discription}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 d-flex">
                                                        <button onClick={() => console.log('delete')}>
                                                            <FaXmark />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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