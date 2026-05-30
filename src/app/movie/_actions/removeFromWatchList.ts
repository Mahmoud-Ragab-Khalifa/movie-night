import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "@/server/db/getCurrentUser";
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
      success: true,
      message: "Movie removed from watchlist",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
