import styles from '@/styles/viewInvoice.module.scss';
import React from 'react';

const ViewInvoiceTable = ({ items = [] }) => {

    return (
        <div className="row">
            <div className={`col-sm-12`}>
                <div className={`${styles.companyInvoiceViewTableWrapper}`}>
                    <table className={`${styles.companyInvoiceViewTable} table`} >
                        <thead>
                            <tr >
                                <th scope="col" className="ps-3">#</th>
                                <th scope="col" className="ps-3">Item & Description</th>
                                <th scope="col" className="ps-3">HSN/SAC</th>
                                <th scope="col" className="ps-3">Qty</th>
                                <th scope="col" className="ps-3">Rate</th>
                                <th scope="col" className="ps-3">Amount</th>
                            </tr>
                        </thead>
                        <tbody >
                            {items.map((item, i) => {
                                return (
                                    <tr key={i} >
                                        <td className={`${styles.companyInvoiceViewTableIndex}`}>{i + 1}</td>
                                        <td className={`${styles.companyInvoiceViewTableItemDescription}`}>{item.itemDescription}</td>
                                        <td className={`${styles.companyInvoiceViewTableItemCode}`}>991512</td>
                                        <td className={`${styles.companyInvoiceViewTableQuantity}`}>{item.quantity}</td>
                                        <td className={`${styles.companyInvoiceViewTableRate}`}>{item.rate}</td>
                                        <td className={`${styles.companyInvoiceViewTableAmount}`}>{parseFloat(item.total).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewInvoiceTable;