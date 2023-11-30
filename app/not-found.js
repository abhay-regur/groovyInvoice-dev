import Link from 'next/link'
import styles from '@/styles/404.module.scss';

export default function NotFound() {
    return (
        <div className={` ${styles.mainContainer} container`}>
            <h1><span className={`${styles.green}`}>Groovy</span> Invoice</h1>
            <p>Requested Page is not present</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}