import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CandidateCreate } from "./pages/Candidate/CandidateCreate";
import { CandidateUpdate } from "./pages/Candidate/CandidateUpdate";
import { CandidateDisposition } from "./pages/Candidate/CandidateSetDisposition";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/candidate/create",
        element: <CandidateCreate />,
    },
    {
        path: "/candidate/:id/update",
        element: <CandidateUpdate />,
    },
    {
        path: "/candidate/:id/disposition",
        element: <CandidateDisposition />,
    },
]);
