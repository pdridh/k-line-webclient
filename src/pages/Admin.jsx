import { useAuth } from "../auth/AuthContext";

export default function Admin() {
    const { user } = useAuth();

    return (
        <>
            <h1>Admin page</h1>

            {user?.id ? <p>{user.id}</p> : null}
        </>
    );
}
