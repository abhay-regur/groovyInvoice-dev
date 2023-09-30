import styles from '../styles/viewInvoice.module.scss';
import React from 'react';
import { useTable, usePagination } from 'react-table';

const ViewInvoiceTable = ({ items = [] }) => {

    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'indexNumber',
            },
            {
                Header: 'Item & Description',
                accessor: 'itemDescription',
            },
            {
                Header: 'HSN/SAC',
                accessor: 'taxCode',
            },
            {
                Header: 'Qty',
                accessor: 'quantity',
            },
            {
                Header: 'Rate',
                accessor: 'rate',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
        ],
        []
    )

    
    

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
                                        <td >{i + 1}</td>
                                        <td >{item.itemDescription}</td>
                                        <td >991512</td>
                                        <td >{item.quantity}</td>
                                        <td >{item.rate}</td>
                                        <td >{item.total}</td>
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