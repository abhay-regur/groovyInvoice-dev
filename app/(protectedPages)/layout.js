"use client"
import AuthLayout from "./authLayout";
import UserLoggedState from "@/context/UserState.context";
// import Toast from '@/components/toast.js';
// import ToastMsg from '@/context/ToastMsg.context';

function Layout({ children }) {

    return (
        <>
            <UserLoggedState>
                <AuthLayout>
                    {children}
                    {/* <ToastMsg>
                        
                        <Toast />
                    </ToastMsg> */}
                </AuthLayout>
            </UserLoggedState>
        </>)
}

export default Layout;