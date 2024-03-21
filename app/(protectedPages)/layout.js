"use client"
import AuthLayout from "./authLayout";
import UserLoggedState from "@/context/UserState.context";
import { UserDataProvider } from '@/context/CurrentUserData.context';

function Layout({ children }) {

    return (
        <>
            <UserLoggedState>
                <UserDataProvider>
                    <AuthLayout>
                        {children}
                    </AuthLayout>
                </UserDataProvider >
            </UserLoggedState>
        </>)
}

export default Layout;