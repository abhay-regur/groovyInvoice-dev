import styles from '@/styles/loading.module.scss';
import defaultProfile from '../../../public/images/default_profile_icon.png';
import Image from 'next/image';
export default function Loading(props) {
    const cols = [];
    const rows = [];
    const tdprofile = (
        <td key={0}>
            <div className={`${styles.companyUserTableCustomerImage}`}>
                <Image src={defaultProfile} alt="Picture of the author" width={42} height={42} />
                <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                    <div className={`${styles.companyUserTableCustomerLoader}`}>
                    </div>
                </span >
            </div >
        </td>
    )
    const td = function (id) {
        return (
            <td key={id}>
                <span className={`${styles.companyUserTableCustomerLoadingWrapper}`} >
                    <div className={`${styles.companyUserTableCustomerLoader}`}>
                    </div>
                </span >
            </td>
        )
    }
    const tr = function (id) {
        return (
            <tr key={id}>
                {props.isProfile ? tdprofile : td(0)}
                {cols}
            </tr>
        )
    }
    for (var i = 1; i < props.columnLength; i++) {
        cols.push(td(i))
    }
    for (var i = 0; i < props.rowsLength; i++) {
        rows.push(tr(i))
    }
    return (
        <>
            <tbody className={props.isLoading ? "" : "hide"}>
                {rows}
            </tbody>
        </>
    )
}