"use client";

import { addToWatchList } from "@/app/movie/_actions/addToWatchList";
import { Button } from "@/components/Button";
import { MovieDetails } from "@/types/tmdb";
import { BadgePlus } from "lucide-react";
import toast from "react-hot-toast";

const AddToWatchListButton = ({ movie }: { movie: MovieDetails }) => {
  const handleAddingToWatchList = async () => {
    const result = await addToWatchList(movie);

    if (result.status && result.message) {
      if (result.status === 200) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <Button
      size="sm"
      className="bg-secondary! ring-neutral-700! shadow-neutral-950! hover:bg-secondary/80! animate-fade-in-lg animation-delay-800"
      onClick={handleAddingToWatchList}
    >
      <BadgePlus size={18} className="text-blue-500" />
      <span>Add To Watchlist</span>
    </Button>
  );
};

export default AddToWatchListButton;
