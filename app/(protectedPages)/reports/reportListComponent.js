"use client"
import { useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/reports.module.scss';
import { NavExpandedState } from '../../../context/NavState.context';

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