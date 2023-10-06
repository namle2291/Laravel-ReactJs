/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { httpRequest } from "../axios-client";

import { PiUserCirclePlusThin } from "react-icons/pi";

const links = [
    {
        path: "/dashboard",
        name: "Dashboard",
    },
    {
        path: "/users",
        name: "Users",
    },
    {
        path: "/products",
        name: "Products",
    },
];

export default function DefaultLayout() {
    const { token, user, setToken, setUser } = useStateContext();

    const location = useLocation();

    const handleLogout = () => {
        httpRequest.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        httpRequest.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="row m-0">
            <div
                className="col-3 shadow border-end ps-0 shadow-sm"
                style={{ height: "100vh" }}
            >
                <ul className="list-group-sm list-group-light p-0">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`list-group-item px-3 border-0 ${
                                item.path == location.pathname
                                    ? "active shadow-sm"
                                    : ""
                            }`}
                            aria-current="true"
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="col-9" style={{ height: "100vh" }}>
                <div className="row">
                    <>
                        {/* Navbar */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            {/* Container wrapper */}
                            <div className="container">
                                {/* Navbar brand */}
                                <a
                                    className="navbar-brand me-2"
                                    href="https://mdbgo.com/"
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                        height={16}
                                        alt="MDB Logo"
                                        loading="lazy"
                                        style={{ marginTop: "-1px" }}
                                    />
                                </a>
                                {/* Toggle button */}
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-mdb-toggle="collapse"
                                    data-mdb-target="#navbarButtonsExample"
                                    aria-controls="navbarButtonsExample"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <i className="fas fa-bars" />
                                </button>
                                {/* Collapsible wrapper */}
                                <div
                                    className="collapse navbar-collapse"
                                    id="navbarButtonsExample"
                                >
                                    {/* Left links */}
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                Dashboard
                                            </a>
                                        </li>
                                    </ul>
                                    {/* Left links */}
                                    <div className="d-flex align-items-center">
                                        <button className="btn p-2 btn-link d-flex align-items-center">
                                            <PiUserCirclePlusThin className="fs-5" />
                                            <Link to="profile">
                                                {user && user.name}
                                            </Link>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="btn p-2 btn-link me-2 text-danger"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                                {/* Collapsible wrapper */}
                            </div>
                            {/* Container wrapper */}
                        </nav>
                        {/* Navbar */}
                    </>
                </div>
                <div
                    className="row py-3 mt-3"
                    style={{ overflowY: "scroll", height: "565px" }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
