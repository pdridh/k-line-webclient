import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function MainLayout() {
    const { user } = useAuth();

    function GetLoginLink() {
        if (user) {
            return null;
        } else {
            return (
                <Link to="auth/login" className="mr-4">
                    Login
                </Link>
            );
        }
    }

    return (
        <div>
            <nav>
                <Link to="/" className="mr-4">
                    Home
                </Link>
                {GetLoginLink()}
            </nav>

            <div>
                <Outlet />
            </div>
        </div>
    );
}
