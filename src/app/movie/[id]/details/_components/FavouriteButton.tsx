"use client";

import { addToFavourites } from "@/app/movie/_actions/addToFavourites";
import { removeFromFavourites } from "@/app/movie/_actions/removeFromFavourites";
import { MovieDetails } from "@/types/tmdb";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const FavouriteButton = ({
  movie,
  isInFavourites,
}: {
  movie: MovieDetails;
  isInFavourites: boolean;
}) => {
  const handleClick = async () => {
    if (isInFavourites) {
      const result = await removeFromFavourites(movie.id);

      if (result.status && result.message) {
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    } else {
      const result = await addToFavourites(movie);

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
    <button
      className="absolute top-4 left-4 cursor-pointer"
      aria-label="Add To Favourites"
      onClick={handleClick}
    >
      {isInFavourites ? (
        <Heart className="text-red-500 fill-red-500" />
      ) : (
        <Heart className="text-muted-foreground fill-muted-foreground" />
      )}
    </button>
  );
};

export default FavouriteButton;
