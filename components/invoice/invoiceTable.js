import { useState, useEffect, useRef } from "react";
import styles from "@/styles/invoiceTable.module.scss";
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaExclamationCircle from '@/assets/icons/faExclamationCircle.svg';
import FaCirclePlus from '@/assets/icons/faCirclePlus.svg';
import FaAngleDown from '@/assets/icons/faAngleDown.svg';
import ItemsAutoCompleteTextArea from "./itemsAutoCompleteTextArea";
import { searchItems } from "@/services/items.service";

const InvoiceTable = (props) => {
    const [items, setItems] = useState([]);

    const itemObject = {
        itemDescription: '',
        quantity: 1,
        rate: 0.00,
        subTotal: 0.00,
        taxAmount: 0.00,
        taxPercent: 0.00,
        total: 0.00,
    };

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
        if (e.target.name == 'quantity' || e.target.name == 'rate' || e.target.name == 'taxPercent') {
            rowData[e.target.name] = e.target.value == '' ? '' : parseFloat(e.target.value);
            rowData['subTotal'] = (typeof rowData.quantity == 'number' ? rowData.quantity : 0) * (typeof rowData.rate == 'number' ? rowData.rate : 0)
            rowData['taxAmount'] = (rowData.subTotal / 100) * rowData.taxPercent
            rowData['total'] = parseFloat((rowData.subTotal + rowData.taxAmount).toFixed(2))
        } else {
            rowData[e.target.name] = e.target.value
        }
        props.itemsData[index] = rowData;
        let temp = Object.assign([], props.itemsData)
        props.setItemsData(temp)
    }

    const getItemData = async (value) => {
        const result = await searchItems(value)
        setItems(result.data)
    }

    const handleItemDescriptionChange = async (index, e) => {
        handleChange(index, e)
        getItemData(e.target.value)
    }

    useEffect(() => {
        if (props.itemsData.length == 0) {
            addAnotherLine()
        }
    }, [props.itemsData.length])

    const handleItemSelect = (index, item) => {
        const rowData = props.itemsData[index];
        rowData['itemId'] = item.id;
        rowData['itemDescription'] = item.description;
        rowData['rate'] = parseFloat(item.rate);
        rowData['subTotal'] = rowData.quantity * rowData.rate;
        rowData['total'] = rowData.subTotal + rowData.taxPercent;
        let temp = Object.assign([], props.itemsData);
        props.setItemsData(temp);
        getItemData(item.description)
    }

    return (
        <>
            <div className="col-12">
                <table className={`${styles.companyInvoiceTable} table`}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3">Item Details</th>
                            <th scope="col" className={`${styles.companyInvoiceItemTableQtyHeader} pe-2 text-end`}>Quantity</th>
                            <th scope="col" className={`${styles.companyInvoiceItemTableRateHeader} pe-2 text-end`}>Rate</th>
                            <th scope="col" className="invoiceTableTaxHead"><span className='d-flex justify-content-center'> Tax Percentage <i className='d-flex align-content-center'><FaExclamationCircle /></i></span></th>
                            <th scope="col" className="text-center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.itemsData.map((item, idx) => {
                            return (
                                <tr key={idx} className={`${styles.comapnyInvoiceTableItemRow}`}>
                                    <td>
                                        <div className={`${styles.companyInvoiceTableItemWarpper}`}>
                                            <ItemsAutoCompleteTextArea
                                                handleChange={(e) => handleItemDescriptionChange(idx, e)}
                                                value={item.itemDescription}
                                                items={items}
                                                handleSelect={(item) => handleItemSelect(idx, item)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`${styles.companyInvoiceTableItemQuantity}`}>
                                            <input type='number' className='form-control' name='quantity' min={0} value={item.quantity} onChange={(e) => handleChange(idx, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`${styles.companyInvoiceTableItemRate}`}>
                                            <input type='number' className='form-control' name='rate' min={0} value={item.rate} onChange={(e) => handleChange(idx, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`${styles.companyInvoiceTableItemPercentage}`}>
                                            <input type='number' className='form-control' name='taxPercent' min={0} value={item.taxPercent} onChange={(e) => handleChange(idx, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <p className={`${styles.companyInvoiceTableItemAmount}`}>
                                            {props.currencySymbol} {parseFloat(item.total).toFixed(2)}
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
            <div className="col-12 mt-3 mt-xl-0">
                <div className="btn-group">
                    <button type="button" className={`${styles.companyInvoiceAddlineBtn} btn btn-outline-primary dropdown-toggle`} onClick={() => addAnotherLine()}>
                        <i><FaCirclePlus /></i>
                        Add Another Line
                        <span><FaAngleDown /></span>
                    </button>
                </div>

            </div>
        </>
    )
};

export default InvoiceTable;
