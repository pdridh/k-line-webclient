export default function NotFound() {
    return (
        <div className="text-center p-8">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-gray-500">
                The page you're looking for doesn't exist.
            </p>
            <a href="/">Go back</a>
        </div>
    );
}
