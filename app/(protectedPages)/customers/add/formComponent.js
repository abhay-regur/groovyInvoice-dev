"use client"
import { useState, useContext, useEffect } from 'react';
import styles from "@/styles/newCustomer.module.scss";
import Loading from "../loading.js";
import { createCustomer } from "@/services/customer.service";
import { GST_TREATMENT } from 'constants/index.js';
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/common/breadcrumb.js';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils.js';
import CustomersForm from '@/components/customers/form.js';

export default function CustomerAddForm() {

    const { replace } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        disableSubmitButton(e.target, 'customer-btn-submit');
        setErrors([]);
        var temp = data;
        if (temp.taxPreference == "taxable") temp.exemptionReason = "";
        if (temp.gstTreatment == GST_TREATMENT.UNREGISTERED_BUSINESS || temp.gstTreatment == GST_TREATMENT.CONSUMER || temp.gstTreatment == GST_TREATMENT.OVERSEAS) temp.GSTIN = "";
        if (temp.gstTreatment == GST_TREATMENT.OVERSEAS) {
            temp.taxPreference = "";
            temp.exemptionReason = "";
        }
        setData(Object.assign({}, temp));

        try {
            var result = await createCustomer(data);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Added',
                    description: '',
                }]);
                setTimeout(function () {
                    replace('/customers');
                }, 2500);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, 'Customer', setToastList))
        }
        enableSubmitButton(e.target, 'customer-btn-submit');
    }

    useEffect(() => {
        setTimeout(function () {
            setIsLoading(false);
        }, 1000);
    }, [])

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="breadcrumbWrapper">
                <Breadcrumb styles={styles} />
            </div>
            <h2 className={`${styles.title}`}>
                New Customer
            </h2>
            {isLoading ?
                <Loading /> :
                <CustomersForm
                    handleSubmit={handleSubmit}
                    data={data}
                    setData={setData}
                    setErrors={setErrors}
                    errors={errors}
                    mode="add"
                />
            }
        </main>
    )
}