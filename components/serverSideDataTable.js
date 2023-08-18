/* eslint-disable react/prop-types */
import { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import TableLoading from '../app/(protectedPages)/users/loading';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/jquery.dataTables.css'
import '../styles/table.style.scss';
import { getTokenKey } from '../services/auth.service'
import { getToken } from '../services/token.service'
import UserHTTPService from '../services/user-http.service';


var delayInMilliseconds = 500;

function ServerSideDT(props, ref) {
    const userHttpService = new UserHTTPService('user');
    let alreadyInitializing = false
    const searchPlaceholder = "Name";
    useImperativeHandle(ref, () => ({
        reload(cb = null, resetPaging = true) {
            const table = $('#' + props.id).DataTable()
            table.ajax.reload(cb, resetPaging)
        },
        reinit() {
            if (alreadyInitializing === false) initDT()
        },
    }))

    async function _handle401(userType) {
        const rememberMe = localStorage.getItem('rememberMe') === 'true'
        if (rememberMe) {
            await userHttpService.refreshAccessToken();
            window.location.reload();
        } else {
            if (userType === 'user') window.location = '/login'
            throw new Error('No user type specified in _handle401() method')
        }
    }

    function initDT() {
        const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'
        $('#' + props.id).DataTable({
            processing: true,
            serverSide: true,
            bLengthChange: false,
            paging: true,
            searching: props.isSearchable,
            destroy: true,
            ajax: {
                url: `${BASE_URL.replace(/\/$/, '')}/${props.ajaxUrl.replace(/^\//, '')}`,
                type: 'GET',
                beforeSend: function (request) {
                    if (props.authUserType !== '') {
                        request.setRequestHeader(
                            'Authorization',
                            `Bearer ` + getToken(getTokenKey(props.authUserType)),
                        );
                    }
                },

                error: function (error) {
                    if (error.status === 401) {
                        _handle401(props.authUserType)
                    }
                },
            },
            columnDefs: [
                { responsivePriority: 1, targets: 0 },
                { responsivePriority: 1, targets: -1 },
                { className: "td-text-center", targets: "_all" },
                { width: "250px", targets: [1, 2] },
            ],
            "initComplete": function () {
                $('.dataTables_filter').remove();
                props.setIsPageLoading(false);
            },
            "drawCallback": function () {
                if (props.isLoading != false) {
                    props.setIsLoading(false);
                }
            },
            dom: '<"table-container"<"filter-wrapper"fl>rt><"bottom"ip><"clear">',
            language: {
                paginate: {
                    next: '<svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.79297 7.21484C8.03906 6.96875 8.03906 6.55859 7.79297 6.3125L2.48828 0.980469C2.21484 0.734375 1.80469 0.734375 1.55859 0.980469L0.929688 1.60938C0.683594 1.85547 0.683594 2.26562 0.929688 2.53906L5.14062 6.75L0.929688 10.9883C0.683594 11.2617 0.683594 11.6719 0.929688 11.918L1.55859 12.5469C1.80469 12.793 2.21484 12.793 2.48828 12.5469L7.79297 7.21484Z" fill="#5C5C5C"/></svg>',
                    previous: '<svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20703 5.78516C0.960938 6.03125 0.960938 6.44141 1.20703 6.6875L6.51172 12.0195C6.78516 12.2656 7.19531 12.2656 7.44141 12.0195L8.07031 11.3906C8.31641 11.1445 8.31641 10.7344 8.07031 10.4609L3.85938 6.25L8.07031 2.01172C8.31641 1.73828 8.31641 1.32812 8.07031 1.08203L7.44141 0.453125C7.19531 0.207031 6.78516 0.207031 6.51172 0.453125L1.20703 5.78516Z" fill="#5C5C5C"/></svg>',
                },
            },
            columns: props.columns,
            ...props.options,
        });

        var table = $('#' + props.id).DataTable();
        $('#table_filter input').on('keyup', function () {
            table.search($(this).val()).clear();
            table.search($(this).val()).draw();
        });
    }

    useEffect(() => {
        alreadyInitializing = true;
        initDT();
    }, [])

    return (<>
        <table id={props.id} className={props.className} width="100%">
            {props.children}
            <TableLoading isLoading={props.isLoading} columnLength={props.columns.length} rowsLength={4} isProfile={true} />
        </table>
    </>)
}
const ServerSideDataTables = forwardRef(ServerSideDT)

export default ServerSideDataTables
