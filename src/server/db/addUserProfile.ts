import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { User } from "@supabase/supabase-js";
import { getUserProfile } from "./getUserProfile";
import { UserProfile } from "@/types/userProfile";

export const addUserProfile = async (user: User) => {
  const supabase = await createSupabaseServerClient();

  const userProfile: UserProfile = await getUserProfile();

  if (userProfile) return null;

  const { error } = await supabase.from("profiles").upsert({
    id: user?.id,
    user_name: user?.user_metadata.userName ?? null,
    email: user?.email,
  });

  if (error) {
    console.error(error.code, error.message);
  }
};
