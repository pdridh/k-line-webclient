import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="auth/login" element={<Login />} />
            </Route>
        </Routes>
    );
}
