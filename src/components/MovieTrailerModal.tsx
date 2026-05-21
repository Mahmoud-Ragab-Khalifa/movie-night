"use client";

import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

const MovieTrailerModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button size="sm" onClick={() => setOpen(true)}>
        <PlayCircle size={18} />
        <span>Watch Now</span>
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-200">
          <div className="relative z-10 w-full max-w-5xl">Hello Modal</div>
        </div>
      )}
    </div>
  );
};

export default MovieTrailerModal;
