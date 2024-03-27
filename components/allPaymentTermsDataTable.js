"use client"

import { useRef, useState } from "react";
import 'datatables.net-dt/js/dataTables.dataTables';
import styles from '@/styles/configuration.module.scss';
import ReactDOM from "react-dom/client";
import ServerSideDataTables from './serverSideDataTable';

const AllPaymentTermsTable = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dtRef = useRef(null);

    const draw_buttons = (row) => {
        return (
            <>
                <div className="d-flex">

                </div>
            </>
        )
    }

    const dtOptions = {
        ajaxUrl: '/payments-term',
        authUserType: 'user',
        columns: [
            {
                data: 'id', name: 'id', searchable: false, orderable: false,
            },
            {
                data: 'label', name: 'label', searchable: false, orderable: true,
            },
            {
                data: 'numberOfDays', name: 'numberOfDays', searchable: false, orderable: false,
            },
            {
                data: 'id', name: 'id', searchable: false, orderable: false,
                createCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                    const root = ReactDOM.createRoot(cell)
                    root.render(draw_buttons(rowData))
                },
            }
        ],
    }

    return (
        <div className="row">
            <div className="col-md-4 col-9 mb-3 p-0">
                <div id="table_filter" className={`${styles.filter_wrapper} input-group`}>
                    {/* <label className="input-group-text">Search:</label>
                    <input type="search" className="form-control" placeholder="Name" aria-controls="table-input" /> */}
                </div>
            </div>
            <div className={`col-sm-12 p-0`}>
                <ServerSideDataTables ref={dtRef} id="manage-customer--table" {...dtOptions} className={`${styles.companyCustomerTable}table table-responsive responsive nowrap`} setIsPageLoading={setIsPageLoading} isLoading={isLoading} setIsLoading={setIsLoading} isSearchable={false}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3" data-priority="1" >Sr</th>
                            <th scope="col" className="ps-3" data-priority="2">Name</th>
                            <th scope="col" className="ps-3" data-priority="3">Number of Days</th>
                            <th scope="col" className="ps-3" data-priority="4"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </ServerSideDataTables>
            </div>
        </div>
    )

}
export default AllPaymentTermsTable;
