"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "@/server/db/getCurrentUser";
import { MovieDetails } from "@/types/tmdb";
import { revalidatePath } from "next/cache";

export const addToWatchList = async (movie: MovieDetails) => {
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

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from("watchlist").upsert({
      user_id: currentUser.id,
      movie_id: movie.id,
      image: movie.poster_path,
      title: movie.title,
      release_date: +movie.release_date.split("-", 1),
      rating: +movie.vote_average.toFixed(1),
    });

    if (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }

    revalidatePath("/profile/watch-list");

    return {
      status: 200,
      message: "Movie Added To Watchlist Successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
