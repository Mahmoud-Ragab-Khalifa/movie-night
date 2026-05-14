"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Movies..."
        className="w-full sm:w-50 ring-2 ring-muted sm:ring-0 glass py-2 px-4 rounded-full transition-all duration-300 sm:focus:w-64 focus:outline-none caret-primary text-sm focus:ring-2 focus:ring-primary/80 focus:shadow-md focus:shadow-primary"
        value={searchedMovie}
        onChange={(e) => setSearchedMovie(e.target.value)}
      />

      <label
        htmlFor="search"
        className="absolute inset-e-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <Search size={20} />
      </label>
    </div>
  );
};

export default SearchBar;
