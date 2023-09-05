"use client"
import { useContext } from 'react';
import styles from '@/styles/reports.module.scss';
import { NavExpandedState } from '@/context/NavState.context';

export default function ReportListsComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    Reports
                </h2>

            </main>
        </div>
    )
}