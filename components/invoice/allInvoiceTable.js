"use client"
import styles from '../../styles/invoice.module.scss';
import React, { useContext, useRef, useState } from 'react';
import Image from 'next/image';
import defaultProfile from '../../public/images/profile_Default.png';
import { ToastMsgContext } from '../../context/ToastMsg.context';
import CheckBox from '../../components/checkBox.js';
import ReactDOM from "react-dom/client";
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import ServerSideDataTables from './../serverSideDataTable';
import { formatDate } from '../../utils/date.utils';
import FaEye from '../../assets/icons/faEye.svg';
import FaExclamationCircle from '../../assets/icons/faExclamationCircle.svg';
import FaPen from '../../assets/icons/faPen.svg';
import Link from 'next/link';

const AllInvoiceTable = ({ ItemsData }) => {
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(true);


    const dtRef = useRef();

    const draw_invoiceNo = (row) => {
        return (
            <>
                <span className={`${styles.companyInvoiceTableInvoiceNumber}`}>
                    <CheckBox label={row.invoiceNo} />
                </span>
            </>
        )
    }

    const draw_userName = (row) => {
        return (
            <>
                <div className={`${styles.companyInvoiceTableCustomerImage}`}>
                    <Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} />
                    <span className={`${styles.companyInvoiceTableCustomerName}`} >
                        {row.customer.firstName + ' ' + row.customer.lastName}
                    </span>
                </div>
            </>
        )
    }

    const draw_action = (rowData) => {
        return (
            <span className={`${styles.companyInvoiceTableActionWrapper}`}>
                <Link href={`/invoices/update/${rowData.id}`}>
                    <span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span>
                </Link>
                <span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span>
                <Link href={`/invoices/${rowData.id}`}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link>
            </span>
        );
    }

    const dtOptions = {
        ajaxUrl: '/invoice/dt/list',
        authUserType: 'user',
        columns: [
            {
                data: 'invoiceNo', name: 'invoiceNo',
                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                    const root = ReactDOM.createRoot(cell)
                    root.render(draw_invoiceNo(rowData))
                },
                searchable: true,
                orderable: true,
            },
            {
                data: 'customer.firstName', name: 'customer.firstName',
                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                    const root = ReactDOM.createRoot(cell)
                    root.render(draw_userName(rowData))
                },
                searchable: true,
                orderable: true,
            },
            {
                data: 'customer.lastName', name: 'customer.lastName', visible: false,
            },
            {
                data: 'dueDate',
                render: (data, type, row) => {
                    return formatDate(row.dueDate)
                },
                searchable: true,
                orderable: true,
            },
            {
                data: 'totalAmount', name: 'totalAmount', searchable: true,
                orderable: true,
            },
            {
                data: null,
                createdCell: (cell, cellData, rowData, rowIndex, colIndex) => {
                    const root = ReactDOM.createRoot(cell)
                    root.render(draw_action(rowData))
                },
                searchable: false,
                orderable: false,
            }
        ],
    }



    return (
        <div className={`row`}>
            <div className={`${styles.comapanyInoviceInvoiceTableWrapper}`}>
                <div className={`col-sm-12 p-0`}>
                    <ServerSideDataTables
                        ref={dtRef}
                        id="manage-invoice--table"
                        {...dtOptions}
                        className={`${styles.companyInvoiceTable}table table-responsive responsive nowrap`}
                        setIsPageLoading={setIsPageLoading}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        isSearchable={false}
                    >
                        <thead>
                            <tr>
                                <th scope="col" className="ps-3" data-priority="1" >
                                    <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='Invoice Number' /></span>
                                </th>
                                <th scope="col" className="ps-3" data-priority="1" >Customer Name</th>
                                <th scope="col" className="ps-3 hide" data-priority="99" >Last name</th>
                                <th scope="col" className="ps-3" data-priority="99">Due Date</th>
                                <th scope="col" className="ps-3" data-priority="99">Amount</th>
                                <th scope="col" className="ps-3" data-priority="99">Action</th>
                                <th scope="col" className="hide" ></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </ServerSideDataTables>
                </div>
            </div>
        </div>

    )
}

export default AllInvoiceTable;