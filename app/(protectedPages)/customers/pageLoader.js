import styles from '@/styles/customers.module.scss';
export default function Loading({ isPageLoading }) {
    return (
        <main className={`${styles.companyMainLoadingWrapper} position-absolute top-0 start-0 end-0 ${isPageLoading ? '' : 'hide'}`}>
            <div className={`${styles.containerLoading} container-fluid`}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </main>
    )
}