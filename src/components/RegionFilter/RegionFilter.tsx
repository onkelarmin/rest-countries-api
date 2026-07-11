import styles from "./RegionFilter.module.scss";
import PickerIcon from "@/assets/svg/icon-chevron.svg?react";

type RegionFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  return (
    <label className={styles.label}>
      <PickerIcon aria-hidden="true" className={styles.icon} />
      <span className="visually-hidden">Filter by Region</span>
      <select
        id="region"
        className={styles.regionFilter}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All regions</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </label>
  );
}
