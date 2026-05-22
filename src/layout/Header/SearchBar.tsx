"use client";

import { useId } from "react";
import { Search } from "lucide-react";
import SearchResults from "@/components/SearchResults";

const SearchBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}) => {
  const id = useId();

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="search"
        id={id}
        placeholder="Search Movies..."
        className="w-full sm:w-50 ring-2 ring-muted shadow-lg shadow-surface glass py-2 px-4 rounded-full outline-none caret-primary text-sm"
        onClick={() => setOpen(true)}
      />

      <label
        htmlFor={id}
        className="absolute inset-e-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
      >
        <Search size={20} />
      </label>

      {open && <SearchResults setOpen={setOpen} />}
    </div>
  );
};

export default SearchBar;
