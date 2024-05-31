import { useRouteError } from "react-router-dom";

import Button from "react-bootstrap/Button";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
            <Button onClick={() => history.back()} variant="secondary" > Go Back </Button>
        </div>
    );
}