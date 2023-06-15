"use client"
import styles from '../styles/user.module.scss';
import { useRef } from 'react';
import 'datatables.net-dt/js/dataTables.dataTables';
import Image from 'next/image';
import ReactDOM from "react-dom/client";
import defaultProfile from '../public/images/profile_Default.png';
import { userActivate, userDeactivate } from '../services/user.service';
import FaPen from '../assets/icons/faPen.svg';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import ServerSideDataTables from './serverSideDataTable';

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

    const draw_activeSwitch = (rowData) => {
        return (
            <span className={styles.companyUserTableExtraFunction}>
                <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                    <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" role="switch" onChange={() => { handlechange(rowData.id, rowData.active) }} id="flexSwitchCheckDefault" checked={rowData.active} />
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

    const handlechange = async (id, active) => {
        var result = '';
        if (active) {
            result = await userDeactivate(id);
        } else {
            result = await userActivate(id);
        }
        console.log(result.status);
        if (result.status == 200) {
            dtRef.current.reload()
        } else {
            console.log(result.data.message);
        }
    }
    return (

        <div className={`row`}>
            <div className={`${styles.comapanyInoviceUserTableWrapper} col-sm-12 p-0`}>
                <ServerSideDataTables ref={dtRef} id="manage-user--table" {...dtOptions} className={`table responsive`}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3" data-priority="1" >User Name</th>
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