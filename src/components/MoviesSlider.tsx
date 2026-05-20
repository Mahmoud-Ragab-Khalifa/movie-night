"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Movie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import { ImageSizes } from "@/types/imageSizes";

const MoviesSlider = ({
  movies,
  imageSize = ImageSizes.ORIGINAL,
}: {
  movies: Movie[];
  imageSize?: ImageSizes;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -240,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8 md:mt-10 relative">
      {/* Navigation Buttons */}
      <button
        className="hidden md:flex fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute left-2 z-50 top-1/2 -translate-y-1/2"
        onClick={scrollLeft}
      >
        <ChevronLeft size={20} strokeWidth={3} />
      </button>

      <button
        className="hidden md:flex fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute right-2 z-50 top-1/2 -translate-y-1/2"
        onClick={scrollRight}
      >
        <ChevronRight size={20} strokeWidth={3} />
      </button>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar snap-x snap-mandatory"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} imageSize={imageSize} />
        ))}
      </div>
    </div>
  );
};

export default MoviesSlider;
