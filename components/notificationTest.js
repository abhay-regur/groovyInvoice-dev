import styles from '@/styles/configuration.module.scss';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { useState, useContext } from 'react';

export default function NotificationTestComponent() {
    const [notificationHeader, setNotificationHeader] = useState('');
    const [notificationDiscribtion, setNotificationDiscribtion] = useState('');
    const { setToastList } = useContext(ToastMsgContext);

    const showNotification = () => {
        notificationHeader == null ? setNotificationHeader('') : true;
        notificationDiscribtion == null ? setNotificationDiscribtion('') : true;

        setToastList([{
            id: Math.floor((Math.random() * 101) + 1),
            title: notificationHeader,
            description: notificationDiscribtion,
        }]);
    }

    return (<>
        <div className="card mb-4">
            <div className={`${styles.industryComponentWrapper} card-body`}>
                <h4>Notification Test</h4>
                <hr />
                <div className="row">
                    <div className="col-10 col-sm-8 col-md-8 col-lg-6">
                        <div className={`${styles.companyInvoiceWrapper} gap-2 mb-4 row`}>
                            <div className="d-flex align-items-center col-12 col-lg-4">
                                <label className={`${styles.companyInvoiceCompanyNotificationHeader}`}>Notification Header</label>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-7">
                                <input name='companyName' type="text" className="form-control" id="companyInvoiceNotificationHeader" value={notificationHeader} onChange={e => { setNotificationHeader(e.target.value) }} placeholder='Notification Header' />
                            </div>
                        </div>
                        <div className={`${styles.companyInvoiceOrganizationNameWrapper} gap-2 mb-4 row`}>
                            <div className="d-flex align-items-center col-12 col-lg-4">
                                <label className={`${styles.companyInvoiceCompanyNotificationDiscribtion}`}>Notification Discribtion</label>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-7">
                                <input name='companyName' type="text" className="form-control" id="companyInvoiceNotificationDiscribtion" value={notificationDiscribtion} onChange={e => { setNotificationDiscribtion(e.target.value) }} placeholder='Notification Discribtion' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className={`${styles.companyInvoiceAddIndustry} d-flex align-contect-center btn blue mt-4 mb-4`} onClick={showNotification}>
                            <span> Show Notification</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}