"use client"
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import styles from "@/styles/userForm.module.scss";
import { NavExpandedState } from '@/context/NavState.context';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { createUser } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import Loading from './loading';
import Breadcrumb from '@/components/common/breadcrumb';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils.js';
import UserForm from '@/components/users/form';

export default function UserUpdateFormComponent() {
    const { replace } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: '',
        password: '',
        confirmPassword: '',
        active: false
    });

    useEffect(() => {
        setTimeout(function () {
            setIsLoading(false);
        }, 1500);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        disableSubmitButton(e.target)
        setErrors([]);
        try {
            var result = await createUser(data);
            setData({
                firstName: '',
                lastName: '',
                email: '',
                cellNumber: '',
                password: '',
                confirmPassword: '',
                active: false
            })
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: data.firstName + ' ' + data.lastName + ' added successfully',
                    description: result.data.message,
                }]);
                // window.location.pathname = '/users/';
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target)
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
                        label="Add New User"
                    />
                }
            </div>
        </main>
    )
}