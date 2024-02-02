

export default function NotificationCard({ idx, data, styles }) {
    return (
        <div className={`${styles.comapnyNotificationMainCard} card text-left`} data-delay={idx}>
            <div className="card-body">
                <div className={`${styles.notificationMain} row`}>
                    <div className='col-10'>
                        <div className={`${styles.notificationInnerWrapper}`}>
                            <p className={`${styles.notificationTitle}`}>{data.title} </p>
                        </div>
                    </div>
                    <div className="col-1 d-flex justify-content-start">
                        <span className={`${styles.companyNotificationTime} text-end`}>{data.time}</span>
                    </div>
                    <div className="col-12">
                        <p className={`${styles.notificationMessage}`}>
                            {data.discription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}