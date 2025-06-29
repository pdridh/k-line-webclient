import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

export default function Redirector() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            navigate("/login", { replace: true });
        } else {
            switch (user.type) {
                case "admin":
                    navigate("/admin", { replace: true });
                    break;
                default:
                    navigate("/", { replace: true });
            }
        }
    }, [user, loading, navigate]);

    return <Loading></Loading>;
}
