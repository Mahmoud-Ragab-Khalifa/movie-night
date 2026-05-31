import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "./getCurrentUser";

export const getFavouritesMovies = async () => {
  const currentUser = await getCurrentUser();

  const supabase = await createSupabaseServerClient();

  const { data: favouritesMovies, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("user_id", currentUser?.id);

  if (error) {
    console.error(error.message);
    return;
  }

  return favouritesMovies;
};
