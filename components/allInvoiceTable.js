import styles from '../styles/invoice.module.scss';
import React from 'react';
import Image from 'next/image';
import { useTable, usePagination } from 'react-table';
import defaultProfile from '../public/images/profile_Default.png';
import TablePagination from "../components/tablePagination.js";
import CheckBox from '../components/checkBox.js';
import FaEye from '../assets/icons/faEye.svg';
import FaExclamationCircle from '../assets/icons/FaExclamationCircle.svg';
import FaPen from '../assets/icons/faPen.svg';
import Link from 'next/link';

const AllInvoiceTable = ({ ItemsData }) => {

    const columns = React.useMemo(
        () => [
            {
                Header: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='Invoice Number' /></span>,
                accessor: 'invoiceNumber',
            },
            {
                Header: 'Customer Name',
                accessor: 'customerName',
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    )

    const data = React.useMemo(
        () => [
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
            },
            {
                invoiceNumber: <span className={`${styles.companyInvoiceTableInvoiceNumber}`}><CheckBox label='#02235665' /></span>,
                customerName: <div className={`${styles.companyInvoiceTableCustomerImage}`}><Image src={defaultProfile} alt="Picture of the author" width={'42px'} height={'42px'} /><span className={`${styles.companyInvoiceTableCustomerName}`} >Maximus Tempor</span></div>,
                dueDate: <><div className={`${styles.companyInvoiceTableDueDate}`}>11/16/2021</div><div className={`${styles.companyInvoiceTableActionDueDateTime}`}>05:33am</div></>,
                amount: <span className={`${styles.companyInvoiceTableAmount}`}>Rs. 32,312.00</span>,
                status: <span className={`${styles.companyInvoiceTableStatus}`}>Unpaid</span>,
                action: <span className={`${styles.companyInvoiceTableActionWrapper}`}><Link href={'/invoices/1010/edit'}><span className={`${styles.companyInvoiceTableActionEdit}`}><FaPen /></span></Link><span className={`${styles.companyInvoiceTableActionInfo}`}><FaExclamationCircle /></span><Link href={'/invoices/1010/'}><span className={`${styles.companyInvoiceTableActionView}`}><FaEye /></span></Link></span>,
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
    },
        usePagination);



    return (
        <div className={`row`}>
            <div className={`${styles.comapanyInoviceInvoiceTableWrapper} col-sm-12 p-0`}>
                <table className={`${styles.companyInvoiceTable} table`} {...getTableProps()}>
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
                <div className={`${styles.companyInvoiceTablePaginationWrapper} row`}>
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

export default AllInvoiceTable;