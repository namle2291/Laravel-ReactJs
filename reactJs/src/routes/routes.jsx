import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestLayout from "../layouts/GuestLayout";

import User from "../pages/User";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import AddOrUpdate from "../pages/Product/AddOrUpdate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            // Default route
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/users",
                element: <User />,
            },
            {
                path: "/products",
                element: <Product />,
            },
            {
                path: "/products/:product_id",
                element: <AddOrUpdate />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export { router };
