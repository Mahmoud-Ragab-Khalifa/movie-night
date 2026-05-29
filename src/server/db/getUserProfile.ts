import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "./getCurrentUser";

export const getUserProfile = async () => {
  const supabase = await createSupabaseServerClient();

  const user = await getCurrentUser();

  const { data: userProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .maybeSingle();

  if (error) {
    console.error(error.code, error.message);
    return;
  }

  return userProfile;
};
