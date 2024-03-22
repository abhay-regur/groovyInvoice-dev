"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from "@/styles/newInvoice.module.scss";
import { NavExpandedState } from '@/context/NavState.context';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import Breadcrumb from '@/components/common/breadcrumb';
import { getInvoice, updateInvoice } from '@/services/invoice.service';
import Loading from "@/app/(protectedPages)/loading.js";
import { useRouter } from 'next/navigation';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { enableElement, disableElement } from '@/utils/form.utils';
import InvoiceForm from '@/components/invoice/form';

export default function InvoiceEditForm() {
    const { id } = useParams();
    const { replace } = useRouter();
    const [errors, setErrors] = useState([]);
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [data, setData] = useState({
        customerId: null,
        invoiceNo: '',
        orderNumber: '',
        invoiceDate: new Date(),
        termsId: null,
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
        } catch (error) {
            if (error.response != undefined && error.response.status == 404) {
                replace('/404');
            } else {
                setErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
        setIsPageLoading(false);
    }

    useEffect(() => {
        setIsPageLoading(true);
        getData();
    }, [])

    const handleSubmit = async ({ currentTarget }, status) => {
        disableElement(currentTarget)
        setErrors([])
        try {
            await updateInvoice(id, { ...data, status })
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Invoice updated successfully',
                description: '',
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
                        />
                    }
                </div>
            </main >
        </div >
    )
}