"use client"
import styles from '../styles/user.module.scss';
import React, { useRef } from 'react';
import Image from 'next/image';
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import ServerSideDataTables from './serverSideDataTable';
import ReactDOM from "react-dom/client";
import defaultProfile from '../public/images/profile_Default.png';
import FaPen from '../assets/icons/faPen.svg';

const AllUserTable = () => {

    const dtRef = useRef();
    const draw_userName = (row) => {
        return (
            <>
                <div className={`${styles.companyUserTableCustomerImage}`}>
                    <Image src={defaultProfile} alt="Picture of the author" width={42} height={42} />
                    <span className={`${styles.companyUserTableCustomerNameWrapper}`} >
                        <div className={`${styles.companyUserTableCustomerName}`}>
                            {row.firstName + ' ' + row.lastName}
                        </div>
                        <div className={`${styles.companyUserTableCustomerEdit} ps-2`}>
                            <FaPen />
                        </div>
                    </span >
                </div >
            </>
        )
    }

    const dtOptions = {
        ajaxUrl: '/users/dt/list',
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
                data: 'cellNumber', name: 'cellNumber', searchable: true,
                orderable: true,
            },
            {
                data: 'email', name: 'email', searchable: true,
                orderable: true,
            },
             {
                data: null, name: 'active',
                render: () => {
                    return ('<span class=' + styles.companyUserTableExtraFunction + '><div class="' + styles.companyUserActiveUserSwitchWrapper + ' form-check form-switch align-items-center d-flex"><input class="' + styles.companyUserActiveUserSwitch + ' form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></span>');
                },
                searchable: false,
                orderable: false,
            }
        ],
    }

    return (
        <div className={`row`}>
            <div className={`${styles.comapanyInoviceUserTableWrapper} col-sm-12 p-0`}>
                <ServerSideDataTables ref={dtRef} id="manage-user--table" {...dtOptions} className={`table`}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3" >User Name</th>
                            <th scope="col" className="ps-3" >Contact Number</th>
                            <th scope="col" className="ps-3" >Email Address</th>
                            <th scope="col" className="ps-3" >Active</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </ServerSideDataTables>
            </div>
        </div>

    )

}

export default AllUserTable;