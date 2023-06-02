import { createContext, useState } from "react";

export const NavExpandedState = createContext(null);

function NavState({ children }) {
    const [navExpandedState, setNavExpandedState] = useState(false);
    return (
        <NavExpandedState.Provider value={{ navExpandedState, setNavExpandedState }}>
            {children}
        </NavExpandedState.Provider>
    );
}

export default NavState;