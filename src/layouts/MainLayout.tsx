import styles from "./MainLayout.module.scss";
import { Outlet, ScrollRestoration } from "react-router";
import { ThemeSwitch } from "@/components/ThemeSwitch/ThemeSwitch";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";

export function MainLayout() {
  return (
    <>
      <header className={styles.header}>
        <Wrapper>
          <div className={styles.layout}>
            <p className="font-2">Where is the world?</p>
            <ThemeSwitch />
          </div>
        </Wrapper>
      </header>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
