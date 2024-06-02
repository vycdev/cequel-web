import { Link, Outlet } from 'react-router-dom';

import React, { useState } from 'react';
import ButtonLink from './components/ButtonLink';

export type IUserContext = {
    username: string;
    email: string;
    idUserType: number;
    accessToken: string;
} | null;

export type IUserContextState = {
    user?: IUserContext;
    setUser?: React.Dispatch<React.SetStateAction<IUserContext>>;
}; 

export const UserContext = React.createContext<IUserContextState>({});

export const setLSUserContext = (userContext: IUserContext) => {
    localStorage.setItem("userContext", JSON.stringify(userContext));
}

export const getLSUserContext = (): IUserContext => {
    const userContext = localStorage.getItem("userContext");

    if (userContext) {
        return JSON.parse(userContext) as IUserContext;
    }

    return null;
}

export const clearLSUserContext = () => {
    localStorage.removeItem("userContext");
}

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<IUserContext>(getLSUserContext());

    const logout = (_) => {
        console.log(user);

        // Send logout request
        fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user?.accessToken
            }
        })

        // Clear user data
        setUser(null);
        clearLSUserContext();
    }

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <nav>
                    <Link to="/" className="title">
                        InfoIntensive
                    </Link>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        <li>
                            <ButtonLink to="/about" variant="outline-dark">About</ButtonLink>
                        </li>
                        <li>
                            <ButtonLink to="/services" variant="outline-dark">Services</ButtonLink>
                        </li>
                        <li>
                            <ButtonLink to="/contact" variant="outline-dark">Contact</ButtonLink>
                        </li>
                        {!user ? 
                            <li>
                                <ButtonLink to="/login" variant="outline-dark">Login</ButtonLink>
                            </li> :
                            <li>
                                <ButtonLink to="/" onClick={logout} variant="outline-dark">Logout</ButtonLink>
                            </li>
                        }
                        {user ? <li id="username">
                            { user?.username }
                        </li>
                        : ""}
                    </ul>
                    
                   
                </nav>
                <Outlet></Outlet>
            </UserContext.Provider>
        </>
    );
}

export default App;