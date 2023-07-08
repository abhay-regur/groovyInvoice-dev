import styles from '../../../styles/loading.module.scss';
import defaultProfile from '../../../public/images/default_profile_icon.png';
import Image from 'next/image';
export default function Loading(props) {
    return (
        <>
            <tbody className={props.isLoading ? "" : "hide"}>
                <tr>
                    <td>
                        <div className={`${styles.companyUserTableCustomerImage}`}>
                            <Image src={defaultProfile} alt="Picture of the author" width={42} height={42} />
                            <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                                <div className={`${styles.companyUserTableCustomerLoader}`}>
                                </div>
                            </span >
                        </div >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={`${styles.companyUserTableCustomerImage}`}>
                            <Image src={defaultProfile} alt="Picture of the author" width={42} height={42} />
                            <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                                <div className={`${styles.companyUserTableCustomerLoader}`}>
                                </div>
                            </span >
                        </div >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={`${styles.companyUserTableCustomerImage}`}>
                            <Image src={defaultProfile} alt="Picture of the author" width={42} height={42} />
                            <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                                <div className={`${styles.companyUserTableCustomerLoader}`}>
                                </div>
                            </span >
                        </div >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={`${styles.companyUserTableCustomerImage}`}>
                            <Image src={defaultProfile} alt="Picture of the author" width={42} height={42} />
                            <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                                <div className={`${styles.companyUserTableCustomerLoader}`}>
                                </div>
                            </span >
                        </div >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                    <td>
                        <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                            <div className={`${styles.companyUserTableCustomerLoader}`}>
                            </div>
                        </span >
                    </td>
                </tr>
            </tbody>
        </>
    )
}