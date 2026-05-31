import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "./getCurrentUser";

export const isMovieInFavourites = async (movieId: number) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.error("User Is Not Found");
    return;
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("favourites")
    .select("id")
    .eq("user_id", currentUser?.id)
    .eq("movie_id", movieId)
    .maybeSingle();

  if (error) {
    console.error(error.cause, error.message);
    return;
  }

  return !!data;
};
