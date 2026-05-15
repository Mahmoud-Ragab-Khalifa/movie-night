"use client";

import {
  ChevronLeft,
  ChevronRight,
  Play,
  PlayCircle,
  Star,
} from "lucide-react";
import { Button } from "./Button";
import { useRef } from "react";
import Image from "next/image";
import { Movie } from "@/types/tmdb";

const MoviesSlider = ({ movies }: { movies: Movie[] }) => {
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
        className="fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute left-2 z-50 top-1/2 -translate-y-1/2"
        onClick={scrollLeft}
      >
        <ChevronLeft size={20} strokeWidth={3} />
      </button>

      <button
        className="fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute right-2 z-50 top-1/2 -translate-y-1/2"
        onClick={scrollRight}
      >
        <ChevronRight size={20} strokeWidth={3} />
      </button>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar snap-x snap-mandatory"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="grid gap-2.5">
            <div className="min-w-60 md:min-w-70 overflow-hidden rounded-lg snap-start relative group">
              {/* Image */}
              <div className="relative aspect-2/3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/original/${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 200px, 240px"
                  className="object-cover transition-all duration-300 group-hover:scale-110 rounded-lg"
                />
              </div>

              {/* OverLay With Watching Button */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star
                        className="text-yellow-500 fill-yellow-500"
                        size={17}
                      />

                      <span className="text-yellow-500 font-medium text-sm pt-1">
                        7.7
                      </span>
                    </div>

                    <span className="hidden md:block text-sm text-neutral-300">
                      2025-04
                    </span>

                    <button className="fully-rounded-btn bg-primary animate-pulse shadow-2xl shadow-primary md:hidden">
                      <Play size={18} />
                    </button>
                  </div>

                  <Button size="sm" className="hidden md:block w-full mt-2.5">
                    <PlayCircle size={18} />
                    <span>View Details</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="hidden md:block px-1.5">
              <p className="mb-0.5 text-sm font-medium overflow-hidden max-w-55 md:max-w-65 truncate">
                SupermanSupermanSupermanSupermanSupermanSupermanSupermanSuperman
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className="text-yellow-500 fill-yellow-500" size={17} />

                  <span className="text-neutral-300 font-medium text-sm pt-1">
                    7.7
                  </span>
                </div>

                <span className="hidden md:block text-sm text-neutral-300">
                  2025
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesSlider;
