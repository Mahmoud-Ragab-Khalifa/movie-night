"use client";

import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import { Movie } from "@/types/tmdb";
import { Search, StarIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import Loader from "./Loader";
import { useEffect, useId, useState } from "react";
import { getSearchResults } from "@/services/api";

const SearchResults = ({ setOpen }: { setOpen: React.Dispatch<boolean> }) => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const id = useId();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) return;
      setLoading(true);
      setMovies([]);

      const searchResults: Movie[] = await getSearchResults(query.trim());

      setLoading(false);
      setMovies(searchResults);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  const closeModal = () => {
    setQuery("");
    setMovies([]);
    setOpen(false);
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      {/* handle clickany where around modal */}
      <div className="absolute inset-0" onClick={closeModal} />

      {/* searched results movie modal wrapper */}
      <div className="absolute top-22.5 md:top-1/2 md:-translate-y-1/2 w-full max-w-lg px-5 md:px-0">
        <div className="glass-strong animate-fade-in-lg rounded-xl px-5 h-[50dvh] grid overflow-y-scroll no-scrollbar">
          <div className="absolute top-0 left-0 inset-x-0 px-5 border-b border-muted flex items-center gap-4">
            {/* Input Field */}
            <div className="flex-1 relative">
              <input
                autoFocus
                type="text"
                name="search"
                id={id}
                placeholder="Search Movies..."
                className="w-full ring-2 ring-muted shadow-lg shadow-surface glass py-2 px-4 my-5 rounded-full transition-all duration-300 focus:outline-none caret-primary text-sm focus:ring-2 focus:ring-primary/80 focus:shadow-md focus:shadow-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setOpen(true)}
              />

              <label
                htmlFor={id}
                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-muted-foreground"
              >
                {loading ? <Loader /> : <Search size={20} />}
              </label>
            </div>

            {/* close modal button */}
            <button
              className="cursor-pointer p-2 text-muted-foreground glass rounded-full ring-2 ring-muted shadow-lg shadow-surface"
              onClick={closeModal}
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Starting with fallback Text in starting search */}
          {!loading && movies.length === 0 && (
            <div className="absolute left-1/2 top-1/2 -translate-1/2 animate-pulse text-muted-foreground text-sm italic w-full text-center">
              Start Searching Movies To Show
            </div>
          )}

          {/* conditional rendering show loader during get data */}
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="pt-20 divide-y divide-muted">
              {movies.map((movie, idx) => (
                <div key={idx}>
                  <Link
                    href={`/movie/${movie.id}/details`}
                    onClick={closeModal}
                    className={`flex items-center gap-5 py-5 animate-fade-in-lg ${idx < 10 && idx !== 0 && `animation-delay-${idx}00`}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={getImageUrl(
                          ImageSizes.W154,
                          movie.poster_path,
                          ImageTypes.MOVIE_CARD,
                        )}
                        alt={movie.title}
                        fill
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h1>{movie.title}</h1>
                      <span className="text-sm text-muted-foreground">
                        Release Date: {movie.release_date.split("-", 1)}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm">
                        <StarIcon
                          className="text-yellow-500 fill-yellow-500"
                          size={17}
                        />
                        <span className="mt-0.5 block">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SearchResults;
