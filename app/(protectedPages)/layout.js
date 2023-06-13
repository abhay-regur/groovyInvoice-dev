"use client"
import AuthLayout from "./authLayout";
import UserLoggedState from "../../context/UserState.context";

function Layout({ children }) {

    return (
        <>
            <UserLoggedState>
                <AuthLayout>
                    {children}
                </AuthLayout>
            </UserLoggedState>
        </>)
}

export default Layout;