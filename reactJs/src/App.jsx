import { RouterProvider } from "react-router-dom";

import { router } from "./routes/routes";
import "./App.css";
import { ContextProvider } from "./contexts/ContextProvider";

function App() {
    return (
        <>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </>
    );
}

export default App;
