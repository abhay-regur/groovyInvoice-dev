"use client"
import AuthLayout from "./authLayout";
import UserLoggedState from "../../context/UserState.context";
import ToastMsg from '../../context/ToastMsg.context';

function Layout({ children }) {

    return (
        <>
            <UserLoggedState>
                <AuthLayout>
                    <ToastMsg>
                        {children}
                    </ToastMsg>
                </AuthLayout>
            </UserLoggedState>
        </>)
}

export default Layout;