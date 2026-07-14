import styles from "./ErrorBoundary.module.scss";
import { isRouteErrorResponse, NavLink, useRouteError } from "react-router";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";
import { Heading } from "@/components/utilities/Heading/Heading";

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message =
    "An unexpected error occurred. Please try again or return to the Homepage.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;

    if (typeof error.data === "string") {
      message = error.data;
    } else if (
      error.data &&
      typeof error.data === "object" &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      message = error.data.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main role="alert" aria-labelledby="error-title">
      <Wrapper>
        <div className={styles.content}>
          <div>
            <p className={styles.eyebrow}>Application error</p>
            <Heading tag="h1" size="h1" id="error-title">
              {title}
            </Heading>
          </div>

          <p>{message}</p>

          <NavLink to="/" className={styles.backLink}>
            <span>Back to Countries</span>
          </NavLink>
        </div>
      </Wrapper>
    </main>
  );
}
