import styles from '../../styles/loading.module.scss';
export default function Loading() {
    return (
        <main className={styles.companyMainLoadingWrapper}>
            <div className={`${styles.containerLoading} container-fluid`}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </main>
    )
}