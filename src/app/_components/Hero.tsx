"use client";

import { Movie } from "@/types/tmdb";
import { useEffect, useState } from "react";

const Hero = ({ trendingMovies }: { trendingMovies: Movie[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const featuredMovies = trendingMovies.slice(0, 5);

  const images = featuredMovies.map(
    (movie) =>
      `${process.env.NEXT_PUBLIC_IMAGE_URL}/original/${movie.backdrop_path}`,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="min-h-screen pt-19.5 md:pt-20 lg:pt-21.5 bg-cover bg-center bg-no-repeat relative transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-full">
        <div className="container">Movie Content</div>
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

export default Hero;
