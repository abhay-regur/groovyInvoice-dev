import { createContext, useState, useMemo } from "react";
import { isLoggedIn } from '@/services/auth.service';

export const UserLoggedState = createContext({
    userLoggedState: false,
    setUserLoggedState: () => { },
});

function UserState({ children }) {
    const [userLoggedState, setUserLoggedState] = useState(isLoggedIn('user'));
    const value = useMemo(() => ({ userLoggedState, setUserLoggedState }), [userLoggedState]);
    return (
        <UserLoggedState.Provider value={value}>
            {children}
        </UserLoggedState.Provider>
    );
}

export default UserState;