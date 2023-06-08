"use client"
import { useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/settings.module.scss';
import { NavExpandedState } from '../../../context/NavState.context';

export default function SettingComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    Settings
                </h2>
            </main>
        </div>
    );
}