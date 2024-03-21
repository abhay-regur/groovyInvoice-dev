"use client"
import Toast from '@/components/toast.js';
import ToastMsg from '@/context/ToastMsg.context';

export default function NotificationLayout({ children }) {
    return (<>
        <ToastMsg>
            {children}
            <Toast />
        </ToastMsg>
    </>)
}