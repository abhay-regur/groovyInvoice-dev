"use client"
import { useContext } from 'react';
import styles from '@/styles/configuration.module.scss';
import PaymentTerms from "@/components/paymentTerms.js";
import Breadcrumb from '@/components/common/breadcrumb';
import { NavExpandedState } from '@/context/NavState.context';
import IndustryComponent from '@/components/industryComponent';
import NotificationTestComponent from '@/components/notificationTest';

export default function ConfigComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="breadcrumbWrapper">
                    <Breadcrumb styles={styles} />
                </div>
                <h2 className={`${styles.title}`}>
                    Configurations (Dev Page)
                </h2>
                <hr />
                <PaymentTerms />
                <IndustryComponent />
                <NotificationTestComponent />

            </main>
        </div>
    );
}