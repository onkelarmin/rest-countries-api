import { RegionFilter } from "@/components/RegionFilter/RegionFilter";
import styles from "./Controls.module.scss";
import { SearchBar } from "@/components/SearchBar/SearchBar";

type ControlsProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filterRegion: string;
  setFilterRegion: (value: string) => void;
};

export function Controls({
  searchQuery,
  setSearchQuery,
  filterRegion,
  setFilterRegion,
}: ControlsProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.controls}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <RegionFilter value={filterRegion} onChange={setFilterRegion} />
    </form>
  );
}
