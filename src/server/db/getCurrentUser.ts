import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export const getCurrentUser = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error.code, error.message);
    return;
  }

  return user;
};
