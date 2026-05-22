"use client";

import { OctagonX, PlayCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { MovieVideo } from "@/types/tmdb";

const MovieTrailerModal = ({
  movieId,
  movieTrailer,
  isHeroSection,
}: {
  movieId?: number;
  movieTrailer: MovieVideo;
  isHeroSection?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const embedUrl = `https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&rel=0`;
  const trailerUrl = `https://www.youtube.com/watch?v=${movieTrailer.key}`;

  return (
    <>
      <Button
        disabled={!movieTrailer.key}
        size="sm"
        onClick={() => {
          setOpen(true);
          if (isHeroSection) {
            router.replace(`/?movie_id=${movieId}`, { scroll: false });
          }
        }}
      >
        {movieTrailer.key ? (
          <>
            <PlayCircle size={18} />
            <span>Watch Now</span>
          </>
        ) : (
          <>
            <OctagonX size={18} />
            <span>No Trailer</span>
          </>
        )}
      </Button>

      {open &&
        createPortal(
          <div className="fixed inset-0 bg-linear-to-r from-black via-black/80 to-black flex items-center justify-center px-4 z-200 animate-fade-in-lg">
            {/* close if click anywhere */}
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            <div className="relative z-10 w-full max-w-5xl">
              {/* Close Button and youtube link*/}
              <div className="absolute inset-x-0 -top-12 flex items-center justify-between">
                <button
                  onClick={() => setOpen(false)}
                  className=" text-white fully-rounded-btn bg-primary"
                >
                  <X size={22} />
                </button>

                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-white"
                >
                  <PlayCircle />
                  Watch on YouTube
                </a>
              </div>

              {/* Video */}
              <div className="relative aspect-video overflow-hidden rounded-2xl animate-fade-in-lg">
                <iframe
                  src={embedUrl}
                  title={movieTrailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              <p className="absolute -bottom-15 left-1/2 -translate-x-1/2 text-muted-foreground text-sm font-medium  animate-pulse">
                Click anywhere to close
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MovieTrailerModal;
