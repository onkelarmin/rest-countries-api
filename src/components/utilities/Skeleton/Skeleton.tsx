import styles from "./Skeleton.module.scss";

type SkeletonProps = {
  classes?: string;
};

export function SkeletonText() {
  return <div className={styles.skeleton}></div>;
}

export function SkeletonHeading() {
  return <div className={`${styles.skeleton} ${styles.skeletonHeading}`}></div>;
}

export function SkeletonButton() {
  return <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>;
}

export function SkeletonInput() {
  return <div className={`${styles.skeleton} ${styles.skeletonInput}`}></div>;
}

export function SkeletonImage({ classes }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonImage} ${classes ? classes : ""}`}
    ></div>
  );
}
