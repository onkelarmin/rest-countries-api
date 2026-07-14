import styles from "./CountryDetails.module.scss";
import {
  SkeletonButton,
  SkeletonHeading,
  SkeletonImage,
  SkeletonText,
} from "@/components/utilities/Skeleton/Skeleton";

export function CountryDetailsSkeleton() {
  return (
    <section className={styles.inner}>
      <SkeletonImage classes={styles.image} />
      <div>
        <SkeletonHeading />

        <div className={styles.lists}>
          <div className="flow-md">
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
          </div>

          <div className="flow-md">
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
          </div>
        </div>

        <div className={styles.borders}>
          <SkeletonHeading />
          <ul>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonButton key={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
