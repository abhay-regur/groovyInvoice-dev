import styles from '../styles/invoice.module.scss';
import FaArrowLeft from '../assets/icons/faArrowLeft.svg';
import FaArrowRight from '../assets/icons/faArrowRight.svg';

const TablePagination = ({ pageIndex, pageOptions, previousPage, canPreviousPage, nextPage, canNextPage, gotoPage }) => {

    return (
        <div className={`${styles.companyInvoiceTablePagination} row justify-content-lg-between`}>
            <div className={`${styles.companyInvoiceTablePaginationPageInfo} col-12 col-md-6 d-flex ms-2`}>
                <span>
                    Showing  {pageIndex + 1} of {pageOptions.length}{' '}
                    Pages{' '}
                </span>
            </div>
            <div className={`${styles.companyInvoiceTablePaginationNavigation} col-12 col-md-4 d-flex me-2`} >
                <button className={`${styles.companyInvoiceTablePaginationButton}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FaArrowLeft />
                </button>
                <ul className={`d-flex list-unstyled`}>
                    {
                        pageOptions.map((index, page) => {
                            let totalPages = pageOptions.length;
                            if (page + 1 > 5 && page + 1 < 10 && totalPages >= 10) {
                                return
                            }
                            if (page + 1 === 10) {
                                return <li key={index} className={pageIndex == page ? `${styles.companyInvoicePaginationNumber} ${styles.active}` : `${styles.companyInvoicePaginationNumber}`} onClick={() => gotoPage(page)}>....{10}</li>
                            }
                            if (page + 1 > 10 && totalPages > 10) {
                                const numbersOFpagesAfter_Page_10 = pageOptions.slice(10);
                                if (numbersOFpagesAfter_Page_10.length > 3 && page + 1 === totalPages) {
                                    return <li key={index} className={pageIndex == page ? `${styles.companyInvoicePaginationNumber} ${styles.active}` : `${styles.companyInvoicePaginationNumber}`} onClick={() => gotoPage(page)}>....{totalPages}</li>
                                }
                                if (numbersOFpagesAfter_Page_10.length > 3 && page + 1 <= 12) {
                                    return <li key={index} className={pageIndex == page ? `${styles.companyInvoicePaginationNumber} ${styles.active}` : `${styles.companyInvoicePaginationNumber}`} onClick={() => gotoPage(page)}>{page + 1}</li>
                                }
                                if (numbersOFpagesAfter_Page_10.length > 3) {
                                    return
                                }
                                return <li key={index} className={pageIndex == page ? `${styles.companyInvoicePaginationNumber} ${styles.active}` : `${styles.companyInvoicePaginationNumber}`} onClick={() => gotoPage(page)}>{page + 1}</li>
                            }
                            return <li key={index} className={pageIndex == page ? `${styles.companyInvoicePaginationNumber} ${styles.active}` : `${styles.companyInvoicePaginationNumber}`} onClick={() => gotoPage(page)}>{page + 1}</li>
                        })}
                </ul>
                <button className={`${styles.companyInvoiceTablePaginationButton} `} onClick={() => nextPage()} disabled={!canNextPage}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}
export default TablePagination;