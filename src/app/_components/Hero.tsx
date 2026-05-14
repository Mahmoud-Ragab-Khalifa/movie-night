"use client";

import { useEffect, useState } from "react";

const images = [
  "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  "https://image.tmdb.org/t/p/original/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg",
  "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
  "https://image.tmdb.org/t/p/original/b9UCfDzwiWw7mIFsIQR9ZJUeh7q.jpg",
  "https://image.tmdb.org/t/p/original/l33oR0mnvf20avWyIMxW02EtQxn.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
