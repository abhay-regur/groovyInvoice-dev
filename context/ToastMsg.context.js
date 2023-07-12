import { createContext, useState, useMemo } from "react";

export const ToastMsgContext = createContext({
    toastList: [],
    setToastList: () => { },
});

function ToastMsg({ children }) {
    const [toastList, setToastList] = useState([]);
    const value = useMemo(() => ({ toastList, setToastList }), [toastList]);
    return (
        <ToastMsgContext.Provider value={value}>
            {children}
        </ToastMsgContext.Provider>
    );
}

export default ToastMsg;