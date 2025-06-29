import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    if (!user) return null;

    const commonLinks = [{ to: "/profile", label: "Profile" }];

    const links = [...commonLinks];

    return (
        <nav className="bg-gray-800 text-white px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold">KLINE</div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `hover:underline ${
                                    isActive
                                        ? "text-blue-400 font-semibold"
                                        : ""
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden focus:outline-none"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden mt-2 space-y-2 px-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `block px-2 py-1 rounded hover:bg-gray-700 ${
                                    isActive ? "bg-gray-700 font-semibold" : ""
                                }`
                            }
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}
