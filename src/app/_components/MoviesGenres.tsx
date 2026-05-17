"use client";

import { Genre } from "@/types/tmdb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const MoviesGenres = ({ genres }: { genres: Genre[] }) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(genres[0]);

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -50,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 50,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="flex gap-2 items-center overflow-x-scroll no-scrollbar my-5"
      ref={sliderRef}
    >
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => setSelectedGenre(genre)}
          className={`whitespace-nowrap text-sm rounded-full py-1 px-3 transition-all duration-300 cursor-pointer hover:bg-primary hover:text-white active:scale-110
            ${selectedGenre.id === genre.id ? "bg-primary text-white shadow-2xl shadow-fuchsia-500" : "bg-secondary text-neutral-300"}`}
        >
          {genre.name}
        </button>
      ))}

      {/* Navigation Buttons */}
      <button
        className="hidden md:flex fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute right-14 md:right-18 lg:right-26 xl:right-42 z-50 top-2.5"
        onClick={scrollLeft}
      >
        <ChevronLeft size={20} strokeWidth={3} />
      </button>

      <button
        className="hidden md:flex fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute right-4 md:right-8 lg:right-16 xl:right-32 z-50 top-2.5"
        onClick={scrollRight}
      >
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default MoviesGenres;
