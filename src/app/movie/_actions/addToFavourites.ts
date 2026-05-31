"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "@/server/db/getCurrentUser";
import { isMovieInFavourites } from "@/server/db/isMovieInFavourites";
import { MovieDetails } from "@/types/tmdb";
import { revalidatePath } from "next/cache";

export const addToFavourites = async (movie: MovieDetails) => {
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
        message: "Sign In To Be Able To Add Movies In Your Favourites",
      };
    }

    const isInYourFavourites = await isMovieInFavourites(movie.id);

    if (isInYourFavourites) {
      return {
        status: 400,
        message: "This Movie Already In Your Favourites",
      };
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from("favourites").upsert({
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

    revalidatePath(`/movie/${movie.id}/details`);
    revalidatePath("/profile/favourites");

    return {
      status: 200,
      message: "Movie Added To Favourites Successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
