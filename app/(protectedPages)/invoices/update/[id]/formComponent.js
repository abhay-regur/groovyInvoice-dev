"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from "@/styles/newInvoice.module.scss";
import Breadcrumb from '@/components/common/breadcrumb';
import InvoiceForm from '@/components/invoice/form';
import Loading from "@/app/(protectedPages)/loading.js";
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { NavExpandedState } from '@/context/NavState.context';
import { getInvoice, updateInvoice } from '@/services/invoice.service';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { enableElement, disableElement } from '@/utils/form.utils';
import "react-datepicker/dist/react-datepicker.css";

export default function InvoiceEditForm() {
    const { id } = useParams();
    const { replace, back } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [errors, setErrors] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [data, setData] = useState({
        customerId: 0,
        invoiceNo: '',
        orderNumber: '',
        invoiceDate: new Date(),
        termsId: 0,
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
    })

    const getData = async () => {
        try {
            const result = await getInvoice(id);
            setData({ ...result.data, invoiceDate: new Date(result.data.invoiceDate), dueDate: new Date(result.data.dueDate) })
            if (result.data.status !== "draft") {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Invalid Invoice',
                    description: 'Cannot Update the Invoice once Saved.',
                }]);
                replace('/invoices');
            }
        } catch (error) {
            if (error.response != undefined && error.response.status == 404) {
                replace('/404');
            } else {
                setErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
    }

    useEffect(() => {
        setIsPageLoading(true);
        getData().then(() => setIsPageLoading(false));
    }, [])

    const handleSubmit = async ({ currentTarget }, status) => {
        disableElement(currentTarget)
        setErrors([])
        try {
            await updateInvoice(id, { ...data, status })
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Invoice updated successfully',
                description: '#' + data.invoiceNo + ' with Amount:' + ' ' + data.totalAmount,
            }]);
        } catch (error) {
            setErrors(genrateErrorMessage(error, 'Invoices', setToastList));
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
                        Update Invoice
                    </h2>
                    {isPageLoading ?
                        <Loading /> :
                        <InvoiceForm
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            setErrors={setErrors}
                            errors={errors}
                            mode="edit"
                        />
                    }
                </div>
            </main >
        </div >
    )
}