"use client"
import styles from '../styles/customers.module.scss';
import { useContext, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import React from 'react';
import ReactDOM from "react-dom/client";
import Image from 'next/image';
import Link from 'next/link';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import defaultProfile from '../public/images/profile_Default.png';
import PageLoader from '../app/(protectedPages)/customers/loading.js';
import ServerSideDataTables from './serverSideDataTable';
import FaPen from '../assets/icons/faPen.svg';

const AllCustomerTable = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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
                        <Link className={`${styles.companyCustomerTableCustomerEdit} ps-2`} href={`/customers/${row.id}/edit`}>
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
                data: 'lastName', name: 'lastName', searchable: true, visible: false,
                orderable: false,
            },
            {
                data: 'cellNumber', name: 'cellNumber', searchable: true,
                orderable: true,
            },
            {
                data: 'email', name: 'email', searchable: true,
                orderable: true,
            },
            {
                data: 'cellNumber', name: 'cellNumber', searchable: false,
                orderable: false,
            }
        ],
    }


    return (
        <div className={`${styles.comapanyInoviceCustomerTableWrapper} row`}>
            <div className="col-md-4 col-9 mb-3 p-0">
                <div id="table_filter" className={`${styles.filter_wrapper} input-group`}>
                    <label className="input-group-text">Search:</label>
                    <input type="search" className="form-control" placeholder="Name" aria-controls="table-input" />
                </div>
                {/* <PageLoader isPageLoading={isPageLoading} /> */}
            </div>
            <div className={`col-sm-12 p-0`}>
                <ServerSideDataTables ref={dtRef} id="manage-customer--table" {...dtOptions} className={`${styles.companyCustomerTable}table table-responsive responsive nowrap`} setIsPageLoading={setIsPageLoading} isLoading={isLoading} setIsLoading={setIsLoading}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3" data-priority="1" >User Name</th>
                            <th scope="col" className="ps-3" data-priority="99" >Last Name</th>
                            <th scope="col" className="ps-3" data-priority="99">Contact Number</th>
                            <th scope="col" className="ps-3" data-priority="99">Company Name</th>
                            <th scope="col" className="ps-3" data-priority="99">Email Address</th>
                            <th scope="col" className="ps-3" data-priority="99" >Receivables</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </ServerSideDataTables>
            </div>
        </div>

    )

}

export default AllCustomerTable;