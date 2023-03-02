import styles from '../styles/customers.module.scss';
import React from 'react';
import Image from 'next/image';
import { useTable, usePagination } from 'react-table';
import defaultProfile from '../public/images/profile_Default.png';
import TablePagination from "../components/tablePagination.js";
import FaPen from '../assets/icons/faPen.svg';

const AllCustomerTable = ({ ItemsData }) => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Customer Name',
                accessor: 'customerName',
            },
            {
                Header: 'Contact Number',
                accessor: 'contactNumber',
            },
            {
                Header: 'Company Name',
                accessor: 'companyName',
            },
            {
                Header: 'Email Address',
                accessor: 'emailAddress',
            },
            {
                Header: 'Receivables',
                accessor: 'receivables',
            },
        ],
        []
    )

    const data = React.useMemo(
        () => [
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
            },
            {
                customerName: <div className={`${styles.companyCustomerTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyCustomerTableCustomerNameWrapper}`}><div className={`${styles.companyCustomerTableCustomerName}`} >Maximus Tempor</div><div className={`${styles.companyCustomerTableCustomerEdit} ps-2`}><FaPen /></div></span></div>,
                contactNumber: <><div className={`${styles.companyCustomerTableContactNumber}`}>408-545-4861</div></>,
                companyName: <span className={`${styles.companyCustomerCompanyName}`}>Regur Technology Solutions</span>,
                emailAddress: <span className={`${styles.companyCustomerTableEmailAddress}`}>test@gmail.com</span>,
                receivables: <span className={`${styles.companyCustomerTableReceivables}`}>Rs. 42,000.00</span>,
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
        <div className={`row`}>
            <div className={`${styles.comapanyInoviceCustomerTableWrapper} col-sm-12 p-0`}>
                <table className={`${styles.companyCustomerTable} table`} {...getTableProps()}>
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
                <div className={`${styles.companyCustomerTablePaginationWrapper} row`}>
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

export default AllCustomerTable;