import styles from "@/styles/footer.module.scss"
export default function Footer() {
    return (
        <>
            <div className={`${styles.footerWrapper} d-flex justify-content-center align-items-center`}>
                <span className={`${styles.footertext}`}> Copyright © Marketing Automation By </span>
            </div>
        </>
    )
}