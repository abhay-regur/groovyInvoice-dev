"use client"
import { useContext } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, Filler, elements, } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from '@/styles/home.module.scss';
import FaQuestionCircleOutline from '@/assets/icons/faQuestionCircleOutline.svg';
import { NavExpandedState } from '@/context/NavState.context';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

export default function DashboardComponent() {
    const { navExpandedState } = useContext(NavExpandedState);

    // useEffect(() => {
    //   const listenStorageChange = () => {
    //     if (localStorage.getItem("language") === null) {
    //       setLangua("english");
    //     } else {
    //       setLangua(localStorage.getItem("language"));
    //     }
    //   };
    //   window.addEventListener("storage", listenStorageChange);
    //   return () => window.removeEventListener("storage", listenStorageChange);
    // });

    const salesChartData = {
        labels: [
            "Apr 2021",
            "May 2021",
            "Jun 2021",
            "Jul 2021",
            "Aug 2021",
            "Sep 2021",
            "Oct 2021",
            "Nov 2021",
            "Dec 2021",
            "Jan  2022",
            "Feb 2022",
            "Mar 2022"
        ],
        datasets: [
            {
                label: "Sales",
                borderRadius: 0,
                data: [0, 0, 0, 0, 0, 0, 100, 100, 50, 500, 300, 250],
                backgroundColor: "#43CB80",
                barThickness: 7,
            },
            {
                label: "Receipts",
                borderRadius: 0,
                data: [0, 0, 0, 0, 0, 0, 100, 100, 100, 380, 530, 30],
                backgroundColor: "#3649AB",
                barThickness: 7,
            },
        ],
    };

    const salesChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            responsive: true,
            legend: {
                display: false,
            },
        },
        scales: {
            xAxes: {
                display: false,
                grid: {
                    display: false,
                }
            },
            yAxes: {
                display: false,
                ticks: {
                    color: "#E83F35",
                    fontSize: 14,
                    beginAtZero: true,
                },
            },
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                max: 700,
            }
        }
    };

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    Dashboard
                </h2>
                <div className={`${styles.card} card`}>
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <span className={`${styles.comapnyInvoiceTotalReceivablesHeading}`}>Total Receivables</span> <span className={`${styles.comapnyInvoiceTotalReceivablesSVG}`}><FaQuestionCircleOutline /></span>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className={`${styles.comapnyInvoiceTotalReceivablesCard} card`}>
                                <div className={`${styles.paddingWrapper}`}>
                                    <div className="row">
                                        <div className="col-12">
                                            <span className={`${styles.comapnyInvoiceTotalUnpaidInvoices}`}>Total Unpaid Invoices Rs. 217,416.39</span>
                                        </div>
                                        <div className="col-12">
                                            <div className={`${styles.comapnyInvoiceTotalReceivedProgressBarWrapper}`}>
                                                {/* <ProgressBar completed="57.77" bgColor="#43CB80" baseBgColor="#3649AB" height="11px" labelSize="0px" borderRadius="0" /> */}
                                                <div className={`${styles.comapnyInvoiceTotalReceivedProgressBarBackground} progress`} role="progressbar" aria-label="Basic example" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                                    <div className={`${styles.comapnyInvoiceTotalReceivedProgressBar} progress-bar`} style={{ width: '55%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='mb-0' />
                                <div className="row">
                                    <div className="col-6 border-end">
                                        <div className={`${styles.comapnyInvoiceTotalReceivablesCurrentTitle}`}>Current</div>
                                        <div className={`${styles.comapnyInvoiceTotalReceivablesCurrent}`}>Rs. 0.00</div>
                                    </div>
                                    <div className="col-6">
                                        <div className={`${styles.comapnyInvoiceTotalReceivablesOverdueTitle}`}>Overdue</div>
                                        <div className={`${styles.comapnyInvoiceTotalReceivablesOverdue}`}>Rs. 217,416.39</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-4">
                                    <div className={`${styles.companyInvoiceSaleTitle}`}>Sales</div>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <div className={`${styles.companyInvoiceSaleYearSelectorWrapper}`}>
                                        <select className={`${styles.companyInvoiceSaleYearSelector} form-select`}>
                                            <option defaultValue>Previous Fiscal Year</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                            <option value="4">Option 4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={`${styles.comapnyInvoiceSaleChartWrapperCard} card`}>
                                <div className="row">
                                    <div className="col-12 col-lg-8">
                                        <Bar data={salesChartData} height={300} options={salesChartOptions} />
                                    </div>
                                    <div className="col-12 col-lg-4 mt-md-3">
                                        <div className={`${styles.companyInvoiceChartTotalWrapper}`}>
                                            <div className={`${styles.companyInvoiceChartTotalSaleWrapper}`}>
                                                <div className={`${styles.companyInvoiceChartTotalSaleTitle}`}>Total Sales</div>
                                                <div className={`${styles.companyInvoiceChartTotalSale}`}>Rs. 15,39,420.30</div>
                                            </div>
                                            <div className={`${styles.companyInvoiceChartTotalReceiptsWrapper}`}>
                                                <div className={`${styles.companyInvoiceChartTotalReceiptsTitle}`}>Total Receipts</div>
                                                <div className={`${styles.companyInvoiceChartTotalReceipts}`}>Rs. 15,53,810.31</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}