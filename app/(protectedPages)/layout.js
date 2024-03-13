"use client"
import AuthLayout from "./authLayout";
import UserLoggedState from "@/context/UserState.context";
import Toast from '@/components/toast.js';
import ToastMsg from '@/context/ToastMsg.context';
import { UserDataProvider } from '@/context/CurrentUserData.context';

function Layout({ children }) {

    return (
        <>
            <UserLoggedState>
                <UserDataProvider>
                    <AuthLayout>
                        <ToastMsg>
                            {children}
                            <Toast />
                        </ToastMsg>
                    </AuthLayout>
                </UserDataProvider >
            </UserLoggedState>
        </>)
}

export default Layout;