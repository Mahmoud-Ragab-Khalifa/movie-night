import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { User } from "@supabase/supabase-js";

export const addUserProfile = async (user: User) => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("profiles").upsert({
    id: user?.id,
    user_name: user?.user_metadata.userName ?? null,
    email: user?.email,
  });

  if (error) {
    console.error(error.code, error.message);
  }
};
