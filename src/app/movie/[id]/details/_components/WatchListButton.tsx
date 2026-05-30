"use client";

import { addToWatchList } from "@/app/movie/_actions/addToWatchList";
import { removeFromWatchList } from "@/app/movie/_actions/removeFromWatchList";
import { Button } from "@/components/Button";
import { MovieDetails } from "@/types/tmdb";
import { BadgePlus, BadgeX } from "lucide-react";
import toast from "react-hot-toast";

const WatchListButton = ({
  movie,
  isMovieInWatchList,
}: {
  movie: MovieDetails;
  isMovieInWatchList: boolean;
}) => {
  const handleClick = async () => {
    if (isMovieInWatchList) {
      const result = await removeFromWatchList(movie.id);

      if (result.status && result.message) {
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    } else {
      const result = await addToWatchList(movie);

      if (result.status && result.message) {
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    }
  };

  return (
    <Button
      size="sm"
      className="bg-secondary! ring-neutral-700! shadow-neutral-950! hover:bg-secondary/80! animate-fade-in-lg animation-delay-800"
      onClick={handleClick}
    >
      {isMovieInWatchList ? (
        <>
          <BadgeX size={18} className="text-red-500" />
          <span>Remove From Watchlist</span>
        </>
      ) : (
        <>
          <BadgePlus size={18} className="text-blue-500" />
          <span>Add To Watchlist</span>
        </>
      )}
    </Button>
  );
};

export default WatchListButton;
