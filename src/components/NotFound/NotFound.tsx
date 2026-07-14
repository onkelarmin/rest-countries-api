import styles from "./NotFound.module.scss";
import { Heading } from "@/components/utilities/Heading/Heading";
import { NavLink } from "react-router";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";

export function NotFound() {
  return (
    <main>
      <Wrapper>
        <div className={styles.content}>
          <p className={styles.status}>404</p>

          <Heading tag="h1" size="h1">
            Page not found
          </Heading>

          <p>Sorry, we couldn't find the page you're looking for.</p>

          <NavLink to="/" className={styles.backLink}>
            <span>Back to Countries</span>
          </NavLink>
        </div>
      </Wrapper>
    </main>
  );
}
