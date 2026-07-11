import styles from "./SearchBar.module.scss";
import SearchIcon from "@/assets/svg/icon-search.svg?react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className={styles.searchBar}>
      <span className="visually-hidden">Search for a country</span>
      <SearchIcon aria-hidden="true" className={styles.icon} />
      <input
        type="search"
        id="search"
        placeholder="Search for a country..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
