import { useAuth } from "../auth/AuthContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <h1>Homepage</h1>
            {user?.id ? <p>{user.id}</p> : null}
        </>
    );
}
