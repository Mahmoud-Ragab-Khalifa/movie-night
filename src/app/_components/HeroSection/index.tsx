"use client";

import { Movie } from "@/types/tmdb";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import MovieContent from "./MovieContent";
import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";

const HeroSection = ({ trendingMovies }: { trendingMovies: Movie[] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [currentImage, setCurrentImage] = useState(0);

  const featuredMovies = trendingMovies.slice(0, 5);

  const images = featuredMovies.map((movie) =>
    isMobile
      ? getImageUrl(ImageSizes.W500, movie.poster_path, ImageTypes.MOBILE_HERO)
      : getImageUrl(
          ImageSizes.W1280,
          movie.backdrop_path,
          ImageTypes.DESKTOP_HERO,
        ),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentMovie: Movie = trendingMovies[currentImage];

  return (
    <section className="h-screen max-h-screen pt-19.5 md:pt-20 lg:pt-21.5 bg-cover bg-center bg-no-repeat relative transition-all duration-500 ease-in-out">
      <div className="absolute inset-0">
        <Image
          src={images[currentImage]}
          alt={currentMovie.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={currentImage === 0}
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-full">
        <div className="container">
          <MovieContent movie={currentMovie!} />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1 w-5 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
              currentImage === index
                ? "bg-primary w-8 shadow-2xl shadow-primary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
