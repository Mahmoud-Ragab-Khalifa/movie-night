"use client";

import { MovieDetails } from "@/types/tmdb";
import { Heart } from "lucide-react";

const FavouriteButton = ({
  movie,
  isInFavourites,
}: {
  movie: MovieDetails;
  isInFavourites: boolean;
}) => {
  return (
    <button
      className="absolute top-4 left-4 cursor-pointer"
      aria-label="Add To Favourites"
    >
      <Heart />
    </button>
  );
};

export default FavouriteButton;
