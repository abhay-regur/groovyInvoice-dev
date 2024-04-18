"use client"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { redirect } from 'next/navigation';
import NavExpandedState from '@/context/NavState.context';
import { isLoggedIn } from '@/services/auth.service';
import { Suspense, useContext, useEffect } from 'react';
import Loading from './loading';
import { getCurrentUserDetails } from "@/services/profile.service";
import { getCompanyDetails } from '@/services/companies.service';
import { UserLoggedState } from '@/context/UserState.context';
import { useCurrentUserData } from '@/context/CurrentUserData.context';
import { getState } from '@/services/countriesState.service';
import { InvoiceDetailsProvider } from '@/context/invoiceDetails.context';

function AuthLayout({ children }) {
    const { userLoggedState, setUserLoggedState } = useContext(UserLoggedState);
    const { setUserInfo } = useCurrentUserData();

    useEffect(() => {
        if (typeof window !== "undefined") {
            require('bootstrap');
        }
        const isUserLoggedIn = isLoggedIn('user');
        setUserLoggedState(isUserLoggedIn);
        if (!userLoggedState) {
            redirect('/login')
        } else {
            setRequiredVariables();
        }
    }, []);

    const setRequiredVariables = async () => {
        try {
            let tempData = {
                userName: '',
                userProfileImage: '',
                companyName: '',
                companyAddress: '',
                userCompanyImage: '',
                datePref: '',
                currencyId: ''
            };
            const currentUserDetails = await getCurrentUserDetails();
            const currentUserCompanyDetails = await getCompanyDetails();
            if (currentUserDetails.status == '200' && currentUserCompanyDetails.status == '200') {
                tempData.userName = (currentUserDetails.data.firstName || '') + ' ' + (currentUserDetails.data.lastName || '');
                tempData.userProfileImage = currentUserDetails.data.profile_image;
                tempData.companyName = currentUserCompanyDetails.data.companyName;
                tempData.userCompanyImage = currentUserCompanyDetails.data.userComapanyImage;
                tempData.userCompanyImage = currentUserCompanyDetails.data.userComapanyImage;
                tempData.datePref = currentUserCompanyDetails.data.dateFormat;
                tempData.currencyId = (currentUserCompanyDetails.data.currencyId || 0);
                const companyState = await getState(currentUserCompanyDetails.data.stateId || 1);
                if (companyState.status == '200' && companyState.data.name !== null) {
                    tempData.companyAddress = companyState.data.name + ', ' + companyState.data.country.name;
                }

                setUserInfo(Object.assign({}, tempData));
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (

        <>
            <div className='pageContent'>
                <NavExpandedState>
                    <Navbar />
                    <InvoiceDetailsProvider>
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </InvoiceDetailsProvider>
                </NavExpandedState>
            </div>
            <Footer />
        </>
    )

}

export default AuthLayout;