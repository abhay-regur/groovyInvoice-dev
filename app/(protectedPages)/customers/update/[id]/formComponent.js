"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from "@/styles/newCustomer.module.scss";
import Breadcrumb from '@/components/common/breadcrumb.js';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import Loading from "../../loading.js";
import { getCustomer, updateUserDetails } from "@/services/customer.service";
import { GST_TREATMENT } from '../../../../../constants';
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils.js';
import CustomersForm from '@/components/customers/form.js';

export default function CustomerEditForm() {
    const { id } = useParams();
    const { navExpandedState } = useContext(NavExpandedState);
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState({
        type: "",
        salutation: "",
        firstName: "",
        lastName: "",
        customerCompanyName: "",
        displayName: "",
        email: "",
        phone: "",
        cellNumber: "",
        skype: "",
        designation: "",
        department: "",
        website: "",
        gstTreatment: 0,
        GSTIN: "",
        panNumber: "",
        placeOfSupply: "",
        taxPreference: "",
        exemptionReason: "",
        currencyId: 105,
        openingBalance: 0,
        paymentTermId: null,
        address: {
            billingAddress: {
                type: "billing-address",
                attention: "",
                countryId: null,
                addressLine1: "",
                addressLine2: "",
                city: "",
                stateId: null,
                zipCode: "",
                phone: "",
                fax: ""
            },
            shippingAddress: {
                type: "shipping-address",
                attention: "",
                countryId: null,
                addressLine1: "",
                addressLine2: "",
                city: "",
                stateId: null,
                zipCode: "",
                phone: "",
                fax: ""
            }
        }
    });

    const getData = async () => {
        try {
            const result = await getCustomer(id);
            setData(result.data);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        disableSubmitButton(e.target, 'customer-btn-submit');
        var temp = data;
        if (temp.taxPreference == "taxable") temp.exemptionReason = "";
        if (temp.gstTreatment == GST_TREATMENT.UNREGISTERED_BUSINESS || temp.gstTreatment == GST_TREATMENT.CONSUMER || temp.gstTreatment == GST_TREATMENT.OVERSEAS) temp.GSTIN = "";
        if (temp.gstTreatment == GST_TREATMENT.OVERSEAS) {
            temp.taxPreference = "";
            temp.exemptionReason = "";
        }
        setData(Object.assign({}, temp));
        try {
            var result = await updateUserDetails(id, data);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Updated Customer',
                    description: data.salutation + ' ' + data.firstName + ' ' + data.lastName + ' details has been update.',
                }]);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target, 'customer-btn-submit');
    }

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="breadcrumbWrapper">
                <Breadcrumb styles={styles} />
            </div>
            <h2 className={`${styles.title}`}>
                Update Customer
            </h2>
            {isLoading ?
                <Loading /> :
                <CustomersForm
                    handleSubmit={handleSubmit}
                    data={data}
                    setData={setData}
                    setErrors={setErrors}
                    errors={errors}
                    mode="edit"
                    id={id}
                />
            }
        </main>
    )
}