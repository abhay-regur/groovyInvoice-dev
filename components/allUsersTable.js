"use client"
import styles from '../styles/user.module.scss';
import { useContext, useRef, useState } from 'react';
import 'datatables.net-dt/js/dataTables.dataTables';
import Image from 'next/image';
import $ from 'jquery';
import ReactDOM from "react-dom/client";
import defaultProfile from '../public/images/profile_Default.png';
import { userActivate, userDeactivate } from '../services/user.service';
import { ToastMsgContext } from '../context/ToastMsg.context';
import FaPen from '../assets/icons/faPen.svg';
import PageLoader from '../app/(protectedPages)/users/pageLoader.js';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import ServerSideDataTables from './serverSideDataTable';
import Link from 'next/link';

const AllUserTable = () => {
    const { setToastList } = useContext(ToastMsgContext);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

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
                        <Link className={`${styles.companyUserTableCustomerEdit} ps-2`} href={`/users/update/${row.id}`}>
                            <FaPen />
                        </Link>
                    </span >
                </div >
            </>
        )
    }

    const draw_activeSwitch = (rowData) => {
        return (
            <span className={styles.companyUserTableExtraFunction}>
                <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                    <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" role="switch" onChange={() => { handlechange(rowData) }} id={`flexSwitchCheckDefault${rowData.id}`} checked={rowData.active} />
                </div>
            </span>
        );
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
                orderable: true,
            },
            {
                data: 'lastName', name: 'lastName', visible: false,
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
                data: 'active', name: 'active',
                createdCell: (cell, cellData, rowData, rowIndex, colIndex) => {
                    const root = ReactDOM.createRoot(cell)
                    root.render(draw_activeSwitch(rowData))
                },
                searchable: false,
                orderable: false,
            }
        ],
    }

    const handlechange = async (rowData) => {
        var result = '';
        var table = $('#manage-user--table').DataTable();
        table.clear();
        setIsLoading(true);
        if (rowData.active) {
            result = await userDeactivate(rowData.id);
        } else {
            result = await userActivate(rowData.id);
        }

        if (result.status == 200) {
            setIsLoading(false);
            dtRef.current.reload();
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Status update for ' + rowData.firstName + ' ' + rowData.lastName,
                description: result.data.message.replace(' successfully', ''),
            }])
        } else {
            console.log(result.data.message);
        }
    }

    return (
        <div className={`${styles.comapanyInoviceUserTableWrapper} row`}>
            <div className="col-md-4 col-9 mb-3 p-0">
                <div id="table_filter" className={`${styles.filter_wrapper} input-group`}>
                    <label className="input-group-text">Search:</label>
                    <input type="search" className="form-control" placeholder="Name" aria-controls="table-input" />
                </div>
                <PageLoader isPageLoading={isPageLoading} />
            </div>
            <div className={`col-sm-12 p-0`}>
                <ServerSideDataTables ref={dtRef} id="manage-user--table" {...dtOptions} className={`table table-responsive responsive nowrap`} setIsPageLoading={setIsPageLoading} isLoading={isLoading} setIsLoading={setIsLoading}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3" data-priority="1" >User Name</th>
                            <th scope="col" className="ps-3" data-priority="99" >Last name</th>
                            <th scope="col" className="ps-3" data-priority="99">Contact Number</th>
                            <th scope="col" className="ps-3" data-priority="99">Email Address</th>
                            <th scope="col" className="ps-3" data-priority="2" >Active</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </ServerSideDataTables>
            </div>
        </div >
    )

}

export default AllUserTable;