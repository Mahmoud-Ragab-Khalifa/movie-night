"use client";

import { useEffect, useId, useState } from "react";
import { Search } from "lucide-react";
import { Movie } from "@/types/tmdb";
import { getSearchResults } from "@/services/api";

const SearchBar = () => {
  const id = useId();

  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) return;

      const searchResults: Movie[] = await getSearchResults(query.trim());

      setMovies(searchResults);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  console.log(movies);

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="search"
        id={id}
        placeholder="Search Movies..."
        className="w-full sm:w-50 ring-2 ring-muted shadow-lg shadow-surface glass py-2 px-4 rounded-full transition-all duration-300 sm:focus:w-64 focus:outline-none caret-primary text-sm focus:ring-2 focus:ring-primary/80 focus:shadow-md focus:shadow-primary"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <label
        htmlFor={id}
        className="absolute inset-e-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <Search size={20} />
      </label>
    </div>
  );
};

export default SearchBar;
