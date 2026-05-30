import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "./getCurrentUser";

export const isMovieInWatchList = async (movieId: number) => {
  const supabase = await createSupabaseServerClient();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log("User Not Found");
    return;
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select("id")
    .eq("movie_id", movieId)
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.log(error.cause, error.message);
    return;
  }

  return !!data;
};
