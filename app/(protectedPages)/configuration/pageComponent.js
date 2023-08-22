"use client"
import { useState, useContext } from 'react';
import styles from '../../../styles/configuration.module.scss';
import PaymentTerms from "../../../components/paymentTerms.js";
import CompanyComponent from '../../../components/companyComponent';
import { NavExpandedState } from '../../../context/NavState.context';

export default function ConfigComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    Configurations
                </h2>
                <hr />

                <PaymentTerms />
                <CompanyComponent />

            </main>
        </div>
    );
}