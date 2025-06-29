import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import RequireAuth from "./auth/RequireAuth";
import NotFound from "./pages/NotFound";
import Redirector from "./pages/Redirector";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Redirector></Redirector>} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="admin"
                    element={
                        <RequireAuth roles={["admin"]}>
                            <Admin />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<NotFound></NotFound>} />
            </Route>
        </Routes>
    );
}
