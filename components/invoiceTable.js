import { useState, useEffect } from "react";
import styles from "../styles/invoiceTable.module.scss";
import FaCircleXmark from '../assets/icons/faCircleXmark.svg';
import FaExclamationCircle from '../assets/icons/faExclamationCircle.svg';
import FaCirclePlus from '../assets/icons/faCirclePlus.svg';

const InvoiceTable = (props) => {
    const itemObject = {
        itemDescription: '',
        quantity: 1,
        rate: 0.00,
        subTotal: 0.00,
        taxAmount: 0.00,
        taxPercent: 0.00,
        total: 0.00,
    };
    // const [itemsData, setItemsData] = useState([])
    const addAnotherLine = () => {
        props.setItemsData([...props.itemsData, itemObject])
    }
    const removeLine = (index) => {
        props.itemsData.splice(index, 1)
        let temp = Object.assign([], props.itemsData)
        props.setItemsData(temp)
    }

    const handleChange = (index, e) => {
        e.preventDefault();
        const rowData = props.itemsData[index];
        rowData[e.target.name] = e.target.value
        if (e.target.name == 'quantity' || e.target.name == 'rate') {
            rowData['subTotal'] = rowData.quantity * rowData.rate
            rowData['total'] = rowData.subTotal + rowData.taxPercent
        }
        props.itemsData[index] = rowData;
        let temp = Object.assign([], props.itemsData)
        props.setItemsData(temp)
    }
    useEffect(() => {
        addAnotherLine()
    }, [])

    return (
        <><div className="col-12">
            <table className={`${styles.companyInvoiceTable} table`}>
                <thead>
                    <tr>
                        <th scope="col" className="ps-3">Item Details</th>
                        <th scope="col" className={`${styles.companyInvoiceItemTableQtyHeader} pe-2 text-end`}>Quantity</th>
                        <th scope="col" className={`${styles.companyInvoiceItemTableRateHeader} pe-2 text-end`}>Rate</th>
                        <th scope="col" className="invoiceTableTaxHead"><span className='d-flex justify-content-center'> Tax <i className='d-flex align-content-center'><FaExclamationCircle /></i></span></th>
                        <th scope="col" className="text-center">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {props.itemsData.map((item, idx) => {
                        return (
                            <tr key={idx} className={`${styles.comapnyInvoiceTableItemRow}`}>
                                <td>
                                    <div className={`${styles.companyInvoiceTableItemWarpper}`}>
                                        <textarea placeholder="Type or click to select an item." className='form-control' name='itemDescription' onChange={(e) => handleChange(idx, e)} value={item.itemDescription}/>
                                    </div>
                                </td>
                                <td>
                                    <div className={`${styles.companyInvoiceTableItemQuantity}`}>
                                        <input className='form-control' name='quantity' value={item.quantity}  onChange={(e) => handleChange(idx, e)}/>
                                    </div>
                                </td>
                                <td>
                                    <div className={`${styles.companyInvoiceTableItemRate}`}>
                                        <input className='form-control' name='rate' value={item.rate}  onChange={(e) => handleChange(idx, e)}/>
                                    </div>
                                </td>
                                <td>
                                    <span className={`${styles.companyInvoiceTableTaxSelectWrapper}`}>
                                        <select className={`${styles.companyInvoiceTableTaxSelect}`}>
                                            <option value="">Non-Taxable</option>
                                            <option value="tds">TDS</option>
                                            <option value="tcs">TCS</option>
                                        </select>
                                    </span>
                                </td>
                                <td>
                                    <p className={`${styles.companyInvoiceTableItemAmount}`}>
                                        Rs. {item.total}
                                    </p>
                                </td>
                                <td className={`${styles.companyInvoiceItemEditCols}`}>
                                    {idx > 0
                                        ? <div className="d-flex" >
                                            <span className={`${styles.redColor} ${styles.companyInvoicePaymentTermRemove}`} onClick={() => removeLine(idx)}><FaCircleXmark /></span>

                                        </div>
                                        : ''}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <div className="col-12">
            <div className="btn-group">
                <button type="button" className={`${styles.companyInvoiceAddlineBtn} btn btn-outline-primary dropdown-toggle`} onClick={() => addAnotherLine()}>
                    <i><FaCirclePlus /></i>
                    Add Another Line
                </button>
            </div>

        </div>
        </>
    )
};

export default InvoiceTable;
