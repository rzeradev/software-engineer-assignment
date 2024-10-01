import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
    <React.StrictMode>
        <ToastContainer />
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root"),
);
