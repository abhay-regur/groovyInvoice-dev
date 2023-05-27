import styles from '../styles/user.module.scss';
import React from 'react';
import Image from 'next/image';
import { useTable, usePagination } from 'react-table';
import defaultProfile from '../public/images/profile_Default.png';
import TablePagination from "./tablePagination.js";
import FaPen from '../assets/icons/faPen.svg';

const AllUserTable = ({ ItemsData }) => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'User Name',
                accessor: 'userName',
            },
            {
                Header: 'Contact Number',
                accessor: 'contactNumber',
            },
            {
                Header: 'Email Address',
                accessor: 'emailAddress',
            },
            {
                Header: '',
                accessor: 'extraFunction',
            },
        ],
        []
    )

    const data = React.useMemo(
        () => [
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },
            {
                userName: <div className={`${styles.companyUserTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyUserTableCustomerNameWrapper}`}><div className={`${styles.companyUserTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyUserTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyUserTableContactNumber}`}>408-545-4861</div></>,
                emailAddress: <span className={`${styles.companyUserTableEmailAddress}`}>test@gmail.com</span>,
                extraFunction: <span className={`${styles.companyUserTableExtraFunction}`}></span>,
            },

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
    }, usePagination);


    return (
        <div className={`row`}>
            <div className={`${styles.comapanyInoviceUserTableWrapper} col-sm-12 p-0`}>
                <table className={`${styles.companyUserTable} table`} {...getTableProps()}>
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
            <div className="col-sm-12 p-0 mb-2">
                <div className={`${styles.companyUserTablePaginationWrapper} row`}>
                    <div className="col-12">
                        <TablePagination
                            pageIndex={pageIndex}
                            pageOptions={pageOptions}
                            previousPage={previousPage}
                            canPreviousPage={canPreviousPage}
                            nextPage={nextPage}
                            canNextPage={canNextPage}
                            gotoPage={gotoPage}
                            styles={styles}
                        />
                    </div>
                </div>
            </div>
        </div>

    )

}

export default AllUserTable;