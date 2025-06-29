import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function InputField({
    id,
    label,
    type,
    value,
    onChange,
    error,
    errorMessage,
    placeholder,
    ...props
}) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? "border-red-600" : "border-gray-300"
                }`}
                {...props}
            />
            {error && errorMessage && (
                <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
        </div>
    );
}

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});
        setLoading(true);
        try {
            const user = await login(email, password);

            if (user == null) {
                // No user therefore redirect to login
                navigate("/login");
                return;
            }

            // At first check if the user is trying a route
            if (state?.path) {
                navigate(state.path);
                return;
            }

            switch (user.type) {
                case "admin":
                    navigate("/admin");
                    break;
                case "register":
                    navigate("/cashier");
                    break;
                case "kitchen":
                    navigate("/kitchen");
                    break;
                case "waiter":
                    navigate("/waiter");
                    break;
                case "driver":
                    break;
                default:
                    navigate("/404");
            }
        } catch (err) {
            if (err?.code == "ERR_JSON_VALIDATION") {
                const errs = {};
                for (const errObj of err.errors) {
                    if (errObj.field === "email" && errObj.code == "email") {
                        errs.email = "Invalid email address";
                    }
                    if (errObj.field === "password" && errObj.code == "min") {
                        errs.password = "Password is too short";
                    }
                }
                setFieldErrors(errs);
                setError(err.message);
            } else if (err?.code == "ERR_LOGIN_INVALIDCREDS") {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 space-y-4"
        >
            <h1 className="text-2xl font-bold text-center">Login</h1>
            {error && <p className="text-red-600 text-center">{error}</p>}

            <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                errorMessage={fieldErrors.email}
                placeholder="Email"
            />

            <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
                errorMessage={fieldErrors.password}
                placeholder="Password"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
            >
                {loading ? "Logging in..." : "Log In"}
            </button>
        </form>
    );
}
