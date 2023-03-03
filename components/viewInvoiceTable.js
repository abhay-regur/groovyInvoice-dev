import styles from '../styles/viewInvoice.module.scss';
import React from 'react';
import { useTable, usePagination } from 'react-table';

const ViewInvoiceTable = ({ ItemsData }) => {

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

    const data = React.useMemo(
        () => [
            {
                indexNumber: <div className={`${styles.companyInvoiceViewTableIndex}`}>1</div>,
                itemDescription: <div className={`${styles.companyInvoiceViewTableItemDescription}`}>Phasellus auctor varius libero</div>,
                taxCode: <span className={`${styles.companyInvoiceViewTableTaxCode}`}>991512</span>,
                quantity: <span className={`${styles.companyInvoiceViewTableQuantity}`}>1.00</span>,
                rate: <span className={`${styles.companyInvoiceViewTableRate}`}>Rs. 1320.00</span>,
                amount: <span className={`${styles.companyInvoiceViewTableAmount}`}>Rs. 1320.00</span>,
            },
            {
                indexNumber: <div className={`${styles.companyInvoiceViewTableIndex}`}>2</div>,
                itemDescription: <div className={`${styles.companyInvoiceViewTableItemDescription}`}>Phasellus auctor varius libero</div>,
                taxCode: <span className={`${styles.companyInvoiceViewTableTaxCode}`}>991512</span>,
                quantity: <span className={`${styles.companyInvoiceViewTableQuantity}`}>1.00</span>,
                rate: <span className={`${styles.companyInvoiceViewTableRate}`}>Rs. 1320.00</span>,
                amount: <span className={`${styles.companyInvoiceViewTableAmount}`}>Rs. 1320.00</span>,
            },
            {
                indexNumber: <div className={`${styles.companyInvoiceViewTableIndex}`}>3</div>,
                itemDescription: <div className={`${styles.companyInvoiceViewTableItemDescription}`}>Phasellus auctor varius libero</div>,
                taxCode: <span className={`${styles.companyInvoiceViewTableTaxCode}`}>991512</span>,
                quantity: <span className={`${styles.companyInvoiceViewTableQuantity}`}>1.00</span>,
                rate: <span className={`${styles.companyInvoiceViewTableRate}`}>Rs. 1320.00</span>,
                amount: <span className={`${styles.companyInvoiceViewTableAmount}`}>Rs. 1320.00</span>,
            },
            {
                indexNumber: <div className={`${styles.companyInvoiceViewTableIndex}`}>4</div>,
                itemDescription: <div className={`${styles.companyInvoiceViewTableItemDescription}`}>Phasellus auctor varius libero</div>,
                taxCode: <span className={`${styles.companyInvoiceViewTableTaxCode}`}>991512</span>,
                quantity: <span className={`${styles.companyInvoiceViewTableQuantity}`}>1.00</span>,
                rate: <span className={`${styles.companyInvoiceViewTableRate}`}>Rs. 1320.00</span>,
                amount: <span className={`${styles.companyInvoiceViewTableAmount}`}>Rs. 1320.00</span>,
            },
            {
                indexNumber: <div className={`${styles.companyInvoiceViewTableIndex}`}>5</div>,
                itemDescription: <div className={`${styles.companyInvoiceViewTableItemDescription}`}>Phasellus auctor varius libero</div>,
                taxCode: <span className={`${styles.companyInvoiceViewTableTaxCode}`}>991512</span>,
                quantity: <span className={`${styles.companyInvoiceViewTableQuantity}`}>1.00</span>,
                rate: <span className={`${styles.companyInvoiceViewTableRate}`}>Rs. 1320.00</span>,
                amount: <span className={`${styles.companyInvoiceViewTableAmount}`}>Rs. 1320.00</span>,
            },
            {
                indexNumber: <div className={`${styles.companyInvoiceViewTableIndex}`}>6</div>,
                itemDescription: <div className={`${styles.companyInvoiceViewTableItemDescription}`}>Phasellus auctor varius libero</div>,
                taxCode: <span className={`${styles.companyInvoiceViewTableTaxCode}`}>991512</span>,
                quantity: <span className={`${styles.companyInvoiceViewTableQuantity}`}>1.00</span>,
                rate: <span className={`${styles.companyInvoiceViewTableRate}`}>Rs. 1320.00</span>,
                amount: <span className={`${styles.companyInvoiceViewTableAmount}`}>Rs. 1320.00</span>,
            }
        ],
        []
    )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        gotoPage,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },
        usePagination);

    return (
        <div className="row">
            <div className={`col-sm-12`}>
                <div className={`${styles.companyInvoiceViewTableWrapper}`}>
                    <table className={`${styles.companyInvoiceViewTable} table`} {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup, i) => (
                                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={i} scope="col" className="ps-3" {...column.getHeaderProps()}>{column.render("Header")}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr key={i} {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td key={i} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}
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