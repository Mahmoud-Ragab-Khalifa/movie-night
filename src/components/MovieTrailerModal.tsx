"use client";

import { PlayCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { createPortal } from "react-dom";

const MovieTrailerModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const embedUrl = `https://www.youtube.com/embed/dnVvVBNwqbo?autoplay=1&rel=0`;

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <PlayCircle size={18} />
        <span>Watch Now</span>
      </Button>

      {open &&
        createPortal(
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center px-4 z-200">
            {/* close if click anywhere */}
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            <div className="relative z-10 w-full max-w-5xl">
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 text-white fully-rounded-btn bg-primary"
              >
                <X size={22} />
              </button>

              {/* Video */}
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <iframe
                  src={embedUrl}
                  title={"selectedVideo.name"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MovieTrailerModal;
