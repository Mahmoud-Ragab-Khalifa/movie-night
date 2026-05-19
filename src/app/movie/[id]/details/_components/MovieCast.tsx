"use client";

import { MovieCastPerson } from "@/types/tmdb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const MovieCast = ({
  cast,
  movieTitle,
}: {
  cast: MovieCastPerson[];
  movieTitle: string;
}) => {
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
    <div className="mt-6 md:mt-14 relative">
      <div className="relative">
        <h4 className="text-xl md:text-2xl font-semibold mb-8">
          {movieTitle} Cast
        </h4>

        {/* Navigation Buttons */}
        <button
          className="hidden md:flex fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute right-10 z-50 top-0"
          onClick={scrollLeft}
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>

        <button
          className="hidden md:flex fully-rounded-btn bg-secondary text-primary md:text-primary/70 transition-all duration-300 hover:md:text-primary absolute right-0 top-0"
          onClick={scrollRight}
        >
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>

      <div
        className="flex items-center gap-5 overflow-x-scroll no-scrollbar relative"
        ref={sliderRef}
      >
        {cast.slice(0, 10).map((person) => (
          <div key={person.id} className="relative">
            <div className="relative w-30 h-30 rounded-full overflow-hidden">
              <Image
                src={
                  person.profile_path
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/w185${person.profile_path}`
                    : "https://res.cloudinary.com/djdhc5rlo/image/upload/q_auto/f_auto/v1779202359/dummy-person_ybxtpd.png"
                }
                alt={person.name}
                fill
                sizes="120px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-black/40" />
            </div>

            <span className="block text-center mt-4 text-neutral-300">
              {person.name}
            </span>

            <span className="block text-center mt-2 text-sm text-muted-foreground">
              character: {person.character}
            </span>
          </div>
        ))}
      </div>

      {/* Colerd Gradient Border */}
      <div className="absolute w-1 h-[calc(100%-50px)] right-0 bottom-0 bg-linear-to-b from-primary/5 via-black/90 to-primary/70 animate-pulse" />

      <div className="absolute w-1 h-[calc(100%-50px)] left-0 bottom-0 bg-linear-to-t from-primary/5 via-black/90 to-primary/70 animate-pulse" />
    </div>
  );
};

export default MovieCast;
