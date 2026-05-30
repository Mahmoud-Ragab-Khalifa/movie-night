import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "./getCurrentUser";

export const getWatchListMovies = async () => {
  const currentUser = await getCurrentUser();

  const supabase = await createSupabaseServerClient();

  const { data: watchListMovies, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", currentUser?.id);

  if (error) {
    console.error(error.message);
    return;
  }

  return watchListMovies;
};
