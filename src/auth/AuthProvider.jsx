import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AUTH_GET_URL, AUTH_LOGIN_URL } from "../config";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user on load
    useEffect(() => {
        fetch(AUTH_GET_URL, { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((jsondata) => {
                setUser(jsondata?.data || null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        const res = await fetch(AUTH_LOGIN_URL, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const resData = await res.json();
        if (!res.ok) {
            throw resData;
        } else {
            setUser(resData.data);
            return resData.data;
        }
    };

    const logout = async () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
