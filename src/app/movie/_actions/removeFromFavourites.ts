"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "@/server/db/getCurrentUser";
import { isMovieInFavourites } from "@/server/db/isMovieInFavourites";
import { revalidatePath } from "next/cache";

export const removeFromFavourites = async (movieId: number) => {
  if (!movieId) {
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

    const isInYourFavourites = await isMovieInFavourites(movieId);

    if (!isInYourFavourites) {
      return {
        status: 400,
        message: "This Movie Is Not In Your Favourites",
      };
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("movie_id", movieId);

    if (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }

    revalidatePath(`/movie/${movieId}/details`);
    revalidatePath("/profile/favourites");

    return {
      status: 200,
      message: "Movie removed from Your Favourites",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
