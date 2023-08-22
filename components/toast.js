import { useState, useEffect, useContext } from 'react';
import { ToastMsgContext } from '../context/ToastMsg.context';
import FaXmark from '../assets/icons/faXmark.svg'
import styles from '../styles/toast.module.scss';


export default function Toast() {
    const autoDeleteTime = 15000;
    const { toastList } = useContext(ToastMsgContext);
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        }

    }, [toastList, autoDeleteTime, list]);

    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <>
            <div className={`${styles.toastContainerMain}`}>
                {
                    list.map((toast, i) =>
                        <div
                            key={i}
                            className={`${styles.toastMain} row`}
                        >
                            <div className='col-10'>
                                <p className={`${styles.toastTitle}`}>{toast.title}</p>
                                <p className={`${styles.toastMessage}`}>
                                    {toast.description}
                                </p>
                            </div>
                            <div className="col-2 d-flex">
                                <button onClick={() => deleteToast(toast.id)}>
                                    <FaXmark />
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}