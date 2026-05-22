"use client";

import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import { Movie } from "@/types/tmdb";
import { StarIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import Loader from "./Loader";

const SearchResults = ({
  movies,
  loading,
  setQuery,
  setMovies,
}: {
  movies: Movie[];
  loading: boolean;
  setQuery: React.Dispatch<string>;
  setMovies: React.Dispatch<Movie[]>;
}) => {
  const closeModal = () => {
    setQuery("");
    setMovies([]);
  };
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/70">
      {/* handle clickany where around modal */}
      <div className="absolute inset-0" onClick={closeModal} />

      {/* customized fixed close modal button in all screens*/}
      <button
        className="fully-rounded-btn fixed top-[calc(50vh+10px)] right-2.5 md:top-[calc(25vh+8px)] md:right-[calc(25vw)] bg-primary text-white z-3000"
        onClick={closeModal}
      >
        <XIcon size={20} />
      </button>

      {/* searched results movie modal wrapper */}
      <div className="fixed bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-1/2 w-full md:max-w-[50vw] h-[50vh] glass-strong animate-fade-in-lg rounded-xl px-5 grid overflow-y-scroll no-scrollbar divide-y divide-muted">
        {/* conditional rendering show loader during get data */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          movies.map((movie, idx) => (
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
          ))
        )}
      </div>
    </div>,
    document.body,
  );
};

export default SearchResults;
