/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateContext = createContext({
    user: {},
    token: null,
    setToken: () => {},
    setUser: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("_token"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("_token", token);
        } else {
            localStorage.removeItem("_token");
        }
    };

    return (
        <>
            <StateContext.Provider
                value={{ token, user, setToken, setUser, toast }}
            >
                {children}
                <ToastContainer position="bottom-right" />
            </StateContext.Provider>
        </>
    );
};

export const useStateContext = () => useContext(StateContext);
