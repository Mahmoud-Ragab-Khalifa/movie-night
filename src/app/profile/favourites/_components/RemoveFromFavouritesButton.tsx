"use client";

import { removeFromFavourites } from "@/app/movie/_actions/removeFromFavourites";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const RemoveFromFavouritesButton = ({ movieId }: { movieId: number }) => {
  const handleRemoveFromWatchList = async () => {
    const result = await removeFromFavourites(movieId);

    if (result.status && result.message) {
      if (result.status === 200) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <button
      className="fully-rounded-btn bg-red-500 transition-all duration-300 ring-2 ring-red-600 hover:ring-red-700"
      onClick={handleRemoveFromWatchList}
    >
      <Trash2 size={18} />
    </button>
  );
};

export default RemoveFromFavouritesButton;
