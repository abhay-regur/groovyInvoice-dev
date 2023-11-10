"use client"
import { useState, useContext } from 'react';
import DatePicker from "react-datepicker";
import styles from '@/styles/payment.module.scss';
import FaProfile from '@/assets/icons/faProfile.svg';
import FaGear from '@/assets/icons/faGear.svg';
import FaUpload from '@/assets/icons/faUpload.svg';
import FaCalendar from '@/assets/icons/faCalendar.svg';
import RadioButton from '@/components/radioButton.js';
import Checkbox from '@/components/checkBox';
import "react-datepicker/dist/react-datepicker.css";
import { NavExpandedState } from '@/context/NavState.context';

export default function PaymentFormComponent() {
    const { navExpandedState } = useContext(NavExpandedState);

    const [tdsSelected, settdsSelected] = useState();

    const [startDate, setStartDate] = useState(new Date());

    const handleTDSRemoved = () => {
        settdsSelected('');
    };

    const handleTDSChange = () => {
        settdsSelected('tds');
    };

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="container-fluid">
                    <h2 className={`${styles.title}`}>
                        Payment for #VS2022/09-01
                    </h2>
                    <div className={`${styles.card} card`}>
                        <div className={`${styles.companyInvoiceCustomerNameWrapper} mb-3 row`}>
                            <div className="col-10">
                                <label className={`${styles.companyInvoiceCustomerNameLabel}`}>Customer Name<span className={`${styles.green}`}>*</span></label>
                            </div>
                            <div className="col-12 col-lg-5 mt-2">
                                <input type="email" className="form-control" id="companyInvoiceCustomerName" placeholder='Customer Name' />
                            </div>
                            <div className="col-12 mt-1">
                                <div className={`${styles.companyInvoiceCustomerDetail}`}>
                                    <FaProfile /> <span>View Cutomer Details</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.companyInvoicePaymentNumberWrapper} mb-3 row`}>
                            <div className="col-10">
                                <label className={`${styles.companyInvoicePaymentNumberLabel}`}>Payment Invoice#<span className={`${styles.green}`}>*</span></label>
                            </div>
                            <div className="col-12 col-md-7 col-lg-5">
                                <div className="row">
                                    <div className="col-12 col-md-7 col-lg-12 d-flex align-items-center mt-2">
                                        <input type="text" className="form-control" id="companyInvoicePaymentNumber" placeholder='Invoice Number' /><FaGear />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 col-lg-10 col-xl-5">
                                <div className={`${styles.companyInvoiceAmountcard} card`}>
                                    <div className="container row p-0">
                                        <div className="col-12 col-lg-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className={`${styles.companyInvoiceAmountRecivedLabel}`}>Ammount Received</label>
                                                </div>
                                                <div className="col-12 mt-2">
                                                    <input type="email" className="form-control" id="companyInvoiceAmountRecived" placeholder='Add amount' />
                                                </div>
                                                <div className="col-12 mt-1">
                                                    <div className={`${styles.companyInvoiceAddPan}`}><span className={`${styles.grey}`}>PAN :</span> Add PAN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 mt-2 mt-lg-0">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className={`${styles.companyInvoiceBankChargesLabel}`}>Bank Charges <span className={`${styles.grey}`}>(If any)</span></label>
                                                </div>
                                                <div className="col-12 mt-2">
                                                    <input type="email" className="form-control" id="companyInvoiceCustomerName" placeholder='Company Email' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-12 col-lg-3">
                                            <span className={`${styles.companyInvoiceTDSText}`}>
                                                Tax Deducted?
                                            </span>
                                        </div>
                                        <div className="col-12 col-lg-8 mt-3 mt-lg-0">
                                            <span className={`${styles.customerInvoicePaymentRadioButtonWrapper} d-flex justify-content-start align-items-center`}>
                                                <RadioButton
                                                    label="No Tax"
                                                    checked={tdsSelected === ''}
                                                    onChange={handleTDSRemoved}
                                                />
                                                <RadioButton
                                                    label="Yes, TDS"
                                                    checked={tdsSelected === 'tds'}
                                                    onChange={handleTDSChange}
                                                />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`${styles.companyInvoicePaymentDateModeWrapper} row`}>
                            <div className="col-12 col-md-4 col-lg-2">
                                <div className="row">
                                    <div className="col-12">
                                        <label className={`${styles.companyInvoicePaymentDateLabel}`}>Payment Date<span className={`${styles.green}`}>*</span></label>
                                    </div>
                                    <div className="col-12 d-flex align-items-center mt-2">
                                        <DatePicker className="form-control" id="companyInvoicePaymentDate" aria-describedby="emailHelp" selected={startDate} onChange={(date) => setStartDate(date)} />  <FaCalendar />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-2 mt-2">
                                <div className="row">
                                    <div className="col-12">
                                        <label className={`${styles.companyInvoicePaymentModeLabel}`}>Payment Mode<span className={`${styles.green}`}>*</span></label>
                                    </div>
                                    <div className="col-12 d-flex align-items-center mt-2">
                                        <select className={`${styles.companyInvoicePaymentModeSelect}  form-select`} id="companyInvoicePaymentModeSelect">
                                            <option defaultValue>Select Mode</option>
                                            <option value="1">Cash</option>
                                            <option value="2">Card</option>
                                            <option value="3">UPI</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-12 col-md-5 mt-2">
                                <div className={`${styles.companyInvoicePaymentReferenceWrapper} mb-3 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoicePaymentReferenceLabel}`}>Reference<span className={`${styles.green}`}>#</span></label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" id="companyInvoicePaymentReference" placeholder='Reference' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-12 col-md-5">
                                <div className={`${styles.companyInvoicePaymentNoteWrapper} mb-3 row`}>
                                    <div className="col-12">
                                        <label className={`${styles.companyInvoicePaymentNoteLabel}`}>Notes</label>
                                    </div>
                                    <div className="col-12 d-flex align-items-center mt-2">
                                        <textarea className="form-control" id="companyInvoicePaymentModer" placeholder='Add Notes' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12"><label className={`${styles.companyInvoicePaymentInputFilelabel}`}>Attach File(s)</label></div>
                            <div className="col-12"></div>
                            <div className="col-11 col-md-6 col-lg-3 mt-2">
                                <div className={`${styles.companyInvoicePaymentInputFileWrapper} d-flex`}>
                                    <span className={`${styles.companyInvoicePaymentInputFileSVGWrapper}`}>
                                        <FaUpload />
                                    </span>
                                    <input className={`${styles.companyInvoicePaymentInputFile}`} type="file" />
                                </div>
                                <div className={`${styles.companyInvoicePaymentInputFileMessage}`}>You can upload a maximum of 3 files, 5MB each</div>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-12 col-md-5 mt-3">
                                <hr />
                            </div>
                            <div className="col-12"></div>
                            <div className="col-12 col-md-5 mt-3">
                                <div className={`${styles.companyInvoicePaymentThankYouCheckboxWrapper}`}>
                                    <Checkbox label="Email a “Thank You” note for this payment" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}