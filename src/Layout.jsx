import { Outlet } from "react-router-dom";
import Navbar from "./utils/Navbar";

export default function MainLayout() {
    return (
        <div>
            <Navbar></Navbar>

            <div>
                <Outlet />
            </div>
        </div>
    );
}
