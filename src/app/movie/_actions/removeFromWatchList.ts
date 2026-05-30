"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "@/server/db/getCurrentUser";
import { isMovieInWatchList } from "@/server/db/isMovieInWatchList";
import { MovieDetails } from "@/types/tmdb";
import { revalidatePath } from "next/cache";

export const removeFromWatchList = async (movie: MovieDetails) => {
  if (!movie) {
    return {
      status: 400,
      message: "Movie Is Not Found",
    };
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        status: 400,
        message: "User Is Not Found",
      };
    }

    const isInWatchList = await isMovieInWatchList(movie.id);

    if (!isInWatchList) {
      return {
        status: 400,
        message: "This Movie Is Not Found In Your Watchlist",
      };
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from("watchlist")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("movie_id", movie.id);

    if (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }

    revalidatePath(`/movie/${movie.id}/details`);
    revalidatePath("/profile/watch-list");

    return {
      status: 200,
      message: "Movie removed from Your watchlist",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
