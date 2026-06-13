import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let title = "An unexpected error occurred.";
    let message = "Something went wrong on our end.";

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            title = "404 - Page Not Found";
            message = "The page you are looking for doesn't exist or you don't have permission";
        }
    }

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>{title}</h1>
            <p>{message}</p>
            <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
                Go Back Home
            </Link>
        </div>
    );
}