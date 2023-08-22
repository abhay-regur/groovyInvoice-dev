"use client"
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/configuration.module.scss';
import FaPlus from '../assets/icons/faCirclePlus.svg'
import ErrorList from './errorList.js';
import { getPaymentTerms, createPaymentTerms, updatePaymentTerms, deletePaymentTerms } from '../services/paymentTerms.service'
import AllPaymentTermsTable from './allPaymentTermsTable.js';
import { ToastMsgContext } from '../context/ToastMsg.context';
export default function PaymentTermsComponent() {
    const [itemsData, setItemData] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [paymentTerm, setPaymentTerm] = useState({
        label: "",
        numberOfDays: 0
    })

    useEffect(() => {
        setErrors([]);
        getPaymentTermsDetails();
    }, []);

    const handleInput = ({ target }) => {
        var temp_data = paymentTerm;
        if (target.name != '') {
            if (target.name == 'numberOfDays') {
                console.log(target.value)
                if (target.value != NaN || target.value != '') {
                    temp_data[target.name] = parseInt(target.value)
                } else {
                    temp_data[target.name] = 0;
                }
            } else {
                temp_data[target.name] = target.value;
            }
            let temp = Object.assign({}, temp_data)
            setPaymentTerm(temp)
        }
    }

    const getPaymentTermsDetails = async () => {
        try {
            var result = await getPaymentTerms();
            var data = result.data;
            var temp = [];
            data.forEach((elem) => {
                temp.push({ id: elem.id, label: elem.label, numberOfDays: elem.numberOfDays });
            });
            setItemData(temp);
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const handleRemove = (id) => {
        setErrors([]);
        setIsLoading(true);
        if (id != undefined) {
            removePaymentTerm(id);
        }
    }

    const removePaymentTerm = async (id) => {
        try {
            var result = await deletePaymentTerms(id);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Removed',
                    description: '',
                }]);
                getPaymentTermsDetails();
            }
        } catch (e) {
            setErrors(e.response.data.message);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        try {
            var result = await createPaymentTerms(paymentTerm);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Added',
                    description: '',
                }]);
                getPaymentTermsDetails();
            }
        } catch (e) {
            setErrors(e.response.data.message);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const testNotification = () => {
        setToastList([{
            id: Math.floor((Math.random() * 101) + 1),
            title: 'Test Heading',
            description: 'This is a test heading ',
        }]);
    }

    const paymenTermsProps = {
        ItemsData: itemsData,
        testNotification: testNotification,
        handleRemove: handleRemove
    }

    return (<>
        <div className="card mb-4">
            <div className={`${styles.paymentTermsDetailsWrapper} card-body`}>
                <h4>Payment Terms</h4>
                <hr />
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-10">
                        <ErrorList errors={errors} />
                        <table className='mb-4'>
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Number of Days</th>
                                </tr>
                            </thead>
                            <AllPaymentTermsTable {...paymenTermsProps} />
                        </table>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-10">
                        <h5>New Payment Term</h5>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-10">
                        <form className='row' onSubmit={handleSubmit}>
                            <div className="col-12 ">
                                <div className={`${styles.companyInvoicePaymentTermLabelWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoicePaymentTermLabel}`}>Label</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='label' type="text" className="form-control" id="companyInvoicePaymentTermLabel" value={paymentTerm.label} onChange={handleInput} placeholder='Label' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className={`${styles.companyInvoicePaymentTermDaysWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoicePaymentTermDays}`}>Number of Days</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='numberOfDays' type="number" className="form-control" id="companyInvoiceNewCustomerCompanyName" min="0" value={paymentTerm.numberOfDays} onChange={handleInput} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <button name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} type='submit'>
                                    <span>
                                        <i><FaPlus /></i>
                                        Add
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}