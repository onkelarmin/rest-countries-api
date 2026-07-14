import {
  SkeletonHeading,
  SkeletonImage,
  SkeletonText,
} from "../utilities/Skeleton/Skeleton";
import styles from "./CountryCard.module.scss";

export function CountryCardSkeleton() {
  return (
    <article className={styles.card}>
      <SkeletonImage classes={styles.flag} />
      <div className={styles.content}>
        <SkeletonHeading />

        <div className={styles.stats}>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
    </article>
  );
}
