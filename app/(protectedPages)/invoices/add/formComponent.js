"use client"
import { useState, useContext } from 'react';
import DatePicker from "react-datepicker";
import InvoiceTable from '../../../../components/invoiceTable';
import RadioButton from '../../../../components/radioButton';
import styles from "../../../../styles/newInvoice.module.scss";
import FaCalendar from "../../../../assets/icons/faCalendar.svg";
import { NavExpandedState } from '../../../../context/NavState.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FaCirclePlus from '../../../../assets/icons/FaCirclePlus.svg';
import FaSave from '../../../../assets/icons/faSave.svg';
import FaPaperPen from '../../../../assets/icons/faPaperPen.svg';
import FaCircleXmark from '../../../../assets/icons/faCircleXmark.svg';
import FaCircleQuestion from '../../../../assets/icons/faCircleQuestion.svg';
import FaGear from '../../../../assets/icons/faGear.svg';
import "react-datepicker/dist/react-datepicker.css";

export default function InvoiceAddForm() {
    const [taxValueSelected, settaxValueSelected] = useState();
    const { navExpandedState } = useContext(NavExpandedState);
    const ItemsData = [
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        },
        {
            ItemDetails: {
                ItemName: "Test 1",
                ItemType: "Goods",
                ItemHSN: "070310101",
            },
            ItemQuantity: "2",
            ItemRate: "20",
            ItemTaxType: "tcs",
            ItemTotalAmount: "48"
        }
    ]

    const [startDate, setStartDate] = useState(new Date());
    // const { height, width } = useWindowDimensions();

    const handleTDSChange = () => {
        settaxValueSelected('tds');
    };

    const handleTCSChange = () => {
        settaxValueSelected('tcs');
    };

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    New Invoice
                </h2>
                <div className="container-fluid">
                    <div className={`${styles.card} card`}>
                        <div className={`${styles.cardBody} card-body`}>
                            <h4 className={`${styles.cardTitle} card-title`}>Customer & Invoice Details</h4>
                            <hr />
                            <div className={`${styles.mainWrapper}`}>
                                <div className="row">
                                    <div className="col-md-12 col-lg-4">
                                        <div className={`${styles.companyNameWrapper} form-group`}>
                                            <label htmlFor="companyName" className="form-label control-label">Company Name<span className={`${styles.green}`}>*</span></label>
                                            <div className="d-flex">
                                                <select className={`${styles.companyNameSelect} form-select`}>
                                                    <option defaultValue>Select Customer</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                <button className={`${styles.companySearchbutton} btn`}><i><FontAwesomeIcon icon={faSearch} /></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className={`${styles.companyInvoiceNumberWrapper} mb-3`}>
                                            <label htmlFor="companyInvoiceNumber" className="form-label">Invoice#<span className={`${styles.green}`}>*</span></label>
                                            <div className={`d-flex align-content-center`}>
                                                <input type="text" className="form-control" id="companyInvoiceNumber" aria-describedby="emailHelp" />
                                                <i><FaGear /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className={`${styles.companyOrderNumberWrapper} mb-3`}>
                                            <label htmlFor="companyOrderNumber" className="form-label">Order Number</label>
                                            <div className={`d-flex align-content-center`}>
                                                <input type="text" className="form-control" id="companyOrderNumber" aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <div className={`${styles.companyInvoiceDateWrapper} mb-3`}>
                                            <label htmlFor="companyInvoiceDate" className="form-label">Invoice Date<span className={`${styles.green}`}>*</span></label>
                                            <div className={`d-flex align-content-center`}>
                                                <DatePicker className="form-control" id="companyInvoiceDate" aria-describedby="emailHelp" selected={startDate} onChange={(date) => setStartDate(date)} />
                                                {/* <input type="text" /> */}
                                                <i><FaCalendar /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <div className={`${styles.companyInvoicetermsWrapper} mb-3`}>
                                            <label htmlFor="companyInvoiceterms" className="form-label">Terms</label>
                                            <div className={`d-flex align-content-center`}>
                                                <input type="text" className="form-control" id="companyInvoiceterms" aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <div className={`${styles.companyInvoiceDueDateWrapper} mb-3`}>
                                            <label htmlFor="companyInvoiceDueDate" className="form-label">Due Date</label>
                                            <div className={`d-flex align-content-center`}>
                                                <DatePicker type="text" className="form-control" id="companyInvoiceDueDate" aria-describedby="emailHelp" selected={startDate} onChange={(date) => setStartDate(date)} />
                                                <i><FaCalendar /></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className={`${styles.companyInvoiceItemsTableMainWrapper} row`}>
                                <div className="col-12">
                                    <InvoiceTable ItemsData={ItemsData} />
                                </div>
                                <div className="col-12">
                                    <div className="btn-group">
                                        <button type="button" className={`${styles.companyInvoiceAddlineBtn} btn btn-outline-primary dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                            <i><FaCirclePlus /></i>
                                            Add Another Line
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div className={`${styles.companyInvoiceBottomWrapper}`}>
                                <div className="row justify-content-left">
                                    <div className="col-md-12 col-lg-5 col-xl-7">
                                        <div className="mb-3">
                                            <label htmlFor="companyInvoiceCustomerNotes" className="form-label">Customer Notes</label>
                                            <textarea className="form-control" placeholder='Enter note' id="companyInvoiceCustomerNotes"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-7 col-xl-5">
                                        <div className={`${styles.card} card justify-content-between`} >
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className={`${styles.subtotalLabel}`}>Sub Total</div>
                                                    <div className={`${styles.subtotalresult}`}>Rs. 18.00</div>
                                                </div>
                                                <div className={`${styles.companyInvoiceTaxOptionWrapper} d-flex align-content-center`}>
                                                    <span className={`${styles.companyInvoiceTaxOptionInputWrapper}`}>
                                                        <span className={`${styles.companyInvoiceTaxSelectorMainWrapper}`}>
                                                            <span className={`${styles.taxTDSRadioButtonWrapper} d-flex align-items-center`}>
                                                                <RadioButton
                                                                    label="TDS"
                                                                    value={taxValueSelected === 'tds'}
                                                                    onChange={handleTDSChange}
                                                                />
                                                            </span>
                                                            <span className={`${styles.taxTCSRadioButtonWrapper} d-flex align-items-center`}>
                                                                <RadioButton
                                                                    label="TCS"
                                                                    value={taxValueSelected === 'tcs'}
                                                                    onChange={handleTCSChange}
                                                                />
                                                            </span>
                                                        </span>
                                                        <span className={`${styles.taxTypeSelectWrapper}`}>
                                                            <select className={`${styles.taxTypeSelect}`}>
                                                                <option defaultValue>Select Tax</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                            </select>
                                                        </span>
                                                    </span>
                                                    <span className={`${styles.totalCalculatedTax} d-flex`}>
                                                        <span className='text-start text-lg-right text-xl-left'>- Rs. 0.00</span>
                                                    </span>
                                                </div>
                                                <div className={`${styles.companyInvoiceAdjustmentWrapper} d-flex row`}>
                                                    <div className={`${styles.companyInvoiceAdjustmentInputWrapper} col-5 order-1 order-lg-1`}>
                                                        <div className="">
                                                            <input type="text" className={`${styles.companyInvoicePriceAdjustment} form-control`} placeholder="Adjustment" />
                                                        </div>
                                                    </div>
                                                    <div className="col-6 order-3 col-lg-4 order-lg-2">
                                                        <div className={`${styles.companyInvoicePriceAdjustment2Wrapper} d-flex`}>
                                                            <input type="text" className={`${styles.companyInvoicePriceAdjustment} form-control`} />
                                                            <i><FaCircleQuestion></FaCircleQuestion></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 col-lg-3 order-2 order-lg-3">
                                                        <span className={`${styles.totalCalculatedAdjustment} d-flex justify-content-end`}>
                                                            <span>- Rs. 0.00</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className={`${styles.companyInvoiceTotalWrapper} row`}>
                                                    <div className="col-6 d-flex text-start align-items-center">
                                                        <h5>Total</h5>
                                                    </div>
                                                    <div className="col-6 text-center text-sm-end">
                                                        <h5>Rs. 18.00</h5>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-8">
                                        <div className={`${styles.companyInvoiceTermsnConditionsWrapper}`}>
                                            <label htmlFor="companyInvoiceTerms&Conditions" className="form-label">Terms & Conditions</label>
                                            <textarea className="form-control" placeholder='Enter the terms and conditions of your business to be displayed in your transaction' id="companyInvoiceTerms&Conditions" rows="7"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-xl-7 px-1">
                                        <span className={`${styles.companyInvoiceSaveButtonsWrapper}`}>
                                            <button className={`${styles.companyInvoiceSaveDraftButton} btn green`}>
                                                <span>
                                                    <i><FaPaperPen /></i>
                                                    Save as Draft
                                                </span>
                                            </button>
                                            <button className={`${styles.companyInvoiceSavenSendButton} btn blue`}>
                                                <span>
                                                    <i><FaSave /></i>
                                                    Save & Send
                                                </span>
                                            </button>
                                        </span>
                                        <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`}>
                                            <span>
                                                <i><FaCircleXmark /></i>
                                                Cancel
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </main>
        </div >
    )
}