"use client"
import { useState, useContext } from 'react';
import styles from "@/styles/newInvoice.module.scss";
import { NavExpandedState } from '@/context/NavState.context';
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from '@/components/common/breadcrumb';
import { saveInvoice } from '@/services/invoice.service';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { enableElement, disableElement } from '@/utils/form.utils';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { useRouter } from 'next/navigation';
import InvoiceForm from '@/components/invoice/form';

export default function InvoiceAddForm() {
    const { replace } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [errors, setErrors] = useState([]);

    const initialData = {
        customerId: '',
        invoiceNo: '',
        orderNumber: '',
        invoiceDate: new Date(),
        termsId: '',
        dueDate: new Date(),
        customerNote: '',
        subTotalAmount: 0,
        shippingCharges: 0,
        totalTaxAmount: 0,
        totalAmount: 0,
        adjustmentText: '',
        adjustmentAmount: 0,
        invoiceItems: [],
        termsAndCondition: '',
    }

    const [data, setData] = useState(initialData);

    const handleSubmit = async ({ currentTarget }, status) => {
        disableElement(currentTarget)
        setErrors([])
        try {
            await saveInvoice({ ...data, status })
            setData(initialData)
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Invoice Added',
                description: '#' + data.invoiceNo + ' with Amount:' + ' ' + data.total,
            }]);
            replace('/invoices');
        } catch (error) {
            setErrors(genrateErrorMessage(error, 'Invoice', setToastList));
        }
        enableElement(currentTarget)
    }

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="breadcrumbWrapper">
                    <Breadcrumb />
                </div>
                <div className="container">
                    <h2 className={`${styles.title}`}>
                        New Invoice
                    </h2>
                    <InvoiceForm
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        setErrors={setErrors}
                        errors={errors}
                        mode="add"
                    />
                </div>
            </main>
        </div >
    )
}