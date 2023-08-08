"use client"
import styles from '../styles/customers.module.scss';
import { useRef, useState } from 'react';
import 'datatables.net-dt/js/dataTables.dataTables';
import React from 'react';
import ReactDOM from "react-dom/client";
import Image from 'next/image';
import Link from 'next/link';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import defaultProfile from '../public/images/profile_Default.png';
import PageLoader from '../app/(protectedPages)/customers/pageLoader.js';
import ServerSideDataTables from './serverSideDataTable';
import FaPen from '../assets/icons/faPen.svg';

const AllCustomerTable = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const dtRef = useRef();

    const draw_userName = (row) => {
        return (
            <>
                <div className={`${styles.companyCustomerTableCustomerImage}`}>
                    <Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} />
                    <span className={`${styles.companyCustomerTableCustomerNameWrapper}`}>
                        <div className={`${styles.companyCustomerTableCustomerName}`} >
                            {row.firstName + ' ' + row.lastName}
                        </div>
                        <Link className={`${styles.companyCustomerTableCustomerEdit} ps-2`} href={`/customers/update/${row.id}`}>
                            <FaPen />
                        </Link>
                    </span>
                </div>
            </>
        )
    }

    const dtOptions = {
        ajaxUrl: '/customers/dt/list',
        authUserType: 'user',
        columns: [
            {
                data: 'firstName', name: 'firstName', searchable: true,
                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                    const root = ReactDOM.createRoot(cell)
                    root.render(draw_userName(rowData))
                },
                searchable: true,
                orderable: true,
            },
            {
                data: 'lastName', name: 'lastName', visible: false,
            },
            {
                data: 'cellNumber', name: 'cellNumber', searchable: true,
                orderable: true,
            },
            {
                data: 'customerCompanyName', name: 'customerCompanyName', searchable: true,
                orderable: true,
            },
            {
                data: 'email', name: 'email', searchable: true,
                orderable: true,
            },
            {
                data: 'cellNumber', name: 'receivables', searchable: false,
                orderable: false,
            }
        ],
    }

    return (
        <div className={`${styles.comapanyInoviceCustomerTableWrapper} row`}>
            <PageLoader isPageLoading={isPageLoading} />
            <div className="col-md-4 col-9 mb-3 p-0">
                <div id="table_filter" className={`${styles.filter_wrapper} input-group`}>
                    <label className="input-group-text">Search:</label>
                    <input type="search" className="form-control" placeholder="Name" aria-controls="table-input" />
                </div>
            </div>
            <div className={`col-sm-12 p-0`}>
                <ServerSideDataTables ref={dtRef} id="manage-customer--table" {...dtOptions} className={`${styles.companyCustomerTable}table table-responsive responsive nowrap`} setIsPageLoading={setIsPageLoading} isLoading={isLoading} setIsLoading={setIsLoading}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3" data-priority="1" >User Name</th>
                            <th scope="col" className="ps-3 hide" data-priority="99" >Last name</th>
                            <th scope="col" className="ps-3" data-priority="99">Contact Number</th>
                            <th scope="col" className="ps-3" data-priority="99">Company Name</th>
                            <th scope="col" className="ps-3" data-priority="99">Email Address</th>
                            <th scope="col" className="ps-3" data-priority="1" >Receivables</th>
                            <th scope="col" className="hide" ></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </ServerSideDataTables>
            </div>
        </div>

    )

}

export default AllCustomerTable;