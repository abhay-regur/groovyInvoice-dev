"use client"
import { useContext, useEffect, useState } from 'react';
import styles from '@/styles/configuration.module.scss';
import FaPlus from '@/assets/icons/faCirclePlus.svg'
import ErrorList from './errorList.js';
import { getPaymentTerms, createPaymentTerms, updatePaymentTerms, deletePaymentTerms } from '@/services/paymentTerms.service'
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import TableLoading from '../app/(protectedPages)/users/loading';
import FaCilcleEllipses from "@/assets/icons/faCircleEllipses.svg";
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCircleCheck from '@/assets/icons/faCircleCheck.svg';
import FaCirclePlus from "@/assets/icons/faCirclePlus.svg";
import { ToastMsgContext } from '@/context/ToastMsg.context';

export default function PaymentTermsComponent() {

    const [itemData, setItemData] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showTableUserInput, setShowTableUserInput] = useState(false);

    const [paymentTerm, setPaymentTerm] = useState({
        label: "",
        numberOfDays: 0
    })

    const [updatePaymentTerm, setUpdatePaymentTerm] = useState({
        id: 0,
        label: "",
        numberOfDays: 0
    })

    useEffect(() => {
        setErrors([]);
        getPaymentTermsDetails();
        setIsLoading(false)
    }, []);

    const handleInput = ({ target }) => {
        var temp_data = paymentTerm;
        if (target.name != '') {
            if (target.name == 'numberOfDays') {
                if (!Number.isNaN((target.value)) && target.value != '') {
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
            setErrors(genrateErrorMessage(error, ''));
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
                    title: 'Payment Terms',
                    description: 'Removed an entry',
                }]);
                removeInputRow();
                getPaymentTermsDetails();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const handleSubmit = async () => {
        setErrors([]);
        setIsLoading(true);
        try {
            var result = await createPaymentTerms(paymentTerm);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Payment Terms',
                    description: 'Added an entry',
                }]);
                getPaymentTermsDetails();
                removeInputRow();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setErrors([]);
        var data = {
            label: updatePaymentTerm.label,
            numberOfDays: updatePaymentTerm.numberOfDays
        }
        try {
            var result = await updatePaymentTerms(updatePaymentTerm.id, data);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Payment Terms',
                    description: 'Entry Updated',
                }]);
                getPaymentTermsDetails();
                hideUpdateSection();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const showUpdateSection = (id) => {
        setErrors([]);
        var temp = itemData.find(item => item.id == id);
        setUpdatePaymentTerm({
            id: temp.id,
            label: temp.label,
            numberOfDays: temp.numberOfDays
        })
        setShowUpdateForm(true)
    }

    const hideUpdateSection = () => {
        setErrors([]);
        setShowUpdateForm(false)
        setUpdatePaymentTerm({
            id: 0,
            label: '',
            numberOfDays: 0
        })
    }

    const addInputsRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setErrors([]);
    }

    const removeInputRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setPaymentTerm({
            label: "",
            numberOfDays: 0
        })
        setErrors([]);
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
                            {isLoading
                                ? <TableLoading isLoading={true} columnLength={3} rowsLength={4} isProfile={false} />
                                : <tbody>
                                    {itemData.map(function (item, idx) {
                                        return (
                                            <tr key={idx} className={`${styles.companyInvoiceContactPersonRow}`}>
                                                <td>
                                                    <span>{idx + 1}</span>
                                                </td>
                                                <td>
                                                    <span>{item.label}</span>
                                                </td>
                                                <td>
                                                    <span>{item.numberOfDays}</span>
                                                </td>
                                                <td className={`${styles.companyInvoiceContantPersonEditRow}`}>
                                                    {
                                                        item.id > 3
                                                            ? <div className="d-flex">
                                                                <span className={`${styles.companyInvoicePaymentTermEdit}`} onClick={() => { showUpdateSection(item.id) }}><FaCilcleEllipses /></span>

                                                                <span className={`${styles.redColor} ${styles.companyInvoicePaymentTermRemove}`} onClick={() => { handleRemove(item.id) }}><FaCircleXmark /></span>
                                                            </div>
                                                            :
                                                            ''
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {showTableUserInput
                                        ? <tr className={`${styles.companyInvoiceContactPersonRow}`}>
                                            <td>
                                                <span>-</span>
                                            </td>
                                            <td>
                                                <input name='label' type="text" className="form-control" id="companyInvoicePaymentTermLabel" value={paymentTerm.label} onChange={handleInput} placeholder='Label' />
                                            </td>
                                            <td>
                                                <input name='numberOfDays' type="number" className="form-control" id="companyInvoiceNewCustomerCompanyName" min="0" value={paymentTerm.numberOfDays} onChange={handleInput} />
                                            </td>
                                            <td className={`${styles.companyInvoiceContantPersonEditRow}`}>
                                                <div className="d-flex">
                                                    <span onClick={handleSubmit}><FaCircleCheck /></span>
                                                    <span className={`${styles.redColor}`} onClick={removeInputRow}><FaCircleXmark /></span>
                                                </div>
                                            </td>
                                        </tr>
                                        : ''
                                    }
                                </tbody>}
                        </table>
                    </div>
                    <div className="col-sm-2"></div>
                    {showUpdateForm ? <>
                        <div className="col-10">
                            <h5>Update Payment Term</h5>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-10">
                            <form className='row' onSubmit={handleUpdate}>
                                <div className="col-12 ">
                                    <div className={`${styles.companyInvoicePaymentTermLabelWrapper} mb-4 row`}>
                                        <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                            <label className={`${styles.companyInvoicePaymentTermLabel}`}>Label</label>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-6">
                                            <input name='label' type="text" className="form-control" id="companyInvoicePaymentTermLabel" value={updatePaymentTerm.label} onChange={handleInput} placeholder='Label' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={`${styles.companyInvoicePaymentTermDaysWrapper} mb-4 row`}>
                                        <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                            <label className={`${styles.companyInvoicePaymentTermDays}`}>Number of Days</label>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-6">
                                            <input name='numberOfDays' type="number" className="form-control" id="companyInvoiceNewCustomerCompanyName" min="0" value={updatePaymentTerm.numberOfDays} onChange={handleInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-md-2">
                                    <button name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} type='submit'>
                                        <span>
                                            <i><FaPlus /></i>
                                            Update
                                        </span>
                                    </button>
                                </div>
                                <div className="col-4 col-md-2">
                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={hideUpdateSection}>
                                        <span>
                                            <i><FaCircleXmark /></i>
                                            Cancel
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </> : <>
                        <div className="col-10">
                            <button className={`${styles.companyInvoiceAddIndustry} d-flex align-contect-center btn blue mb-4`} onClick={addInputsRow}>
                                <span><i><FaCirclePlus /></i>Add New Payment Term</span>
                            </button>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    </>);
}