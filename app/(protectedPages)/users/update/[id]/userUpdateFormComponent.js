"use client"
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { userDetails, updateUserDetails } from '@/services/user.service';
import styles from "@/styles/userForm.module.scss";
import { NavExpandedState } from '@/context/NavState.context';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import Breadcrumb from '@/components/common/breadcrumb';
import Loading from './loading.js';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils.js';
import UserForm from '@/components/users/form';

export default function UserUpdateFormComponent() {
    const { id } = useParams();
    const { replace } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext)
    const [errors, setErrors] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: '',
        active: false
    })

    useEffect(() => {
        setIsLoading(true);
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        setErrors([]);
        try {
            const result = await userDetails(id);
            setData(result.data);
        } catch (error) {
            if (error.response != undefined && error.response.status == 404) {
                replace('/404');
            } else {
                setErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
        setIsLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        disableSubmitButton(e.target)
        setErrors([]);
        try {
            const result = await updateUserDetails(id, data);
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: data.firstName + ' ' + data.lastName + ' details updated',
                description: result.data.message,
            }]);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target)
        getUserDetails();
    }

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="breadcrumbWrapper">
                <Breadcrumb styles={styles} />
            </div>
            <div className="container-fluid">
                {isLoading ?
                    <Loading /> :
                    <UserForm
                        handleSubmit={handleSubmit}
                        data={data}
                        setData={setData}
                        errors={errors}
                        label="Update User"
                    />
                }
            </div>
        </main>
    )
}