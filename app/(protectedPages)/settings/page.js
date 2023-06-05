"use client"
import { useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/settings.module.scss';
import { NavExpandedState } from '../../../context/NavState.context';

export default function Settings() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (<>
        <div className={styles.container}>
            <Head>
                <title>Groovy Invoice</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    Settings
                </h2>

            </main>
        </div>
    </>)
}