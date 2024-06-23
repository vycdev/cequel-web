import { Link, Outlet } from 'react-router-dom';

import React, { useState } from 'react';
import ButtonLink from './components/ButtonLink';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

// TODO: make a queue for the authorized requests and implement auto token refreshing
export const authorizedRequest = async (url: string, method: string, body?: any) => {
    // Get user context
    const userContext = getLSUserContext();

    // Send request
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userContext?.accessToken
        },
        body: JSON.stringify(body)
    }).then(async response => {
        if (response.status === 401) {
            // refresh token and try again
            const refreshTokenResponse = await fetch("/api/auth/refresh", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                }, 
            });

            if (refreshTokenResponse.ok) {
                const refreshTokenResult = await refreshTokenResponse.json();
                if (refreshTokenResult.success) {
                    const newUserContext = { ...userContext, ...refreshTokenResult.result };
                    setLSUserContext(newUserContext);
                    return await authorizedRequest(url, method, body);
                }
            } 

            // Clear user data from local storage
            clearLSUserContext();

            // Redirect to login
            window.location.href = "/login";
        } else 
            return response; 
    });

    return response;
}

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<IUserContext>(getLSUserContext());

    const logout = (_) => {
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

        // Redirect to login
        window.location.href = "/login";
    }

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <nav>
                    <Link to="/" className="title">
                        💻 InfoIntensive
                    </Link>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        {user ?
                            <>
                                <li>
                                    <ButtonLink to="/exercises" variant="outline-dark">Exercises</ButtonLink>
                                </li>
                            </>                         
                        : ""}
                        <li>
                            <ButtonLink to="/docs" variant="outline-dark">Docs</ButtonLink>
                        </li>
                        {!user ? 
                            <li>
                                <ButtonLink to="/login" variant="outline-dark">Login</ButtonLink>
                            </li> :
                            <li>
                                <ButtonLink to="/" onClick={logout} variant="outline-dark">Logout</ButtonLink>
                            </li>
                        }
                        {user ?
                            <li>
                                <ButtonLink to="/profile" variant="outline-primary"><FontAwesomeIcon icon={faUser} />{"  "} { user?.username }</ButtonLink>
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