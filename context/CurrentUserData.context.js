import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    userInfo: {
        userName: '',
        userProfileImage: '',
        companyName: '',
        companyAddress: '',
        userCompanyImage: '',
        datePref: '',
        currencyId: ''
    },
    setUserInfo: () => { }
}
);


export const UserDataProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userProfileImage: '',
        companyName: '',
        companyAddress: '',
        userCompanyImage: '',
        datePref: '',
        currencyId: ''
    });

    return (
        <UserContext.Provider value={{ ...userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);