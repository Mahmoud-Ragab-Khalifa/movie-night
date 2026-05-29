import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export const uploadImage = async (file: File) => {
  const supabase = await createSupabaseServerClient();

  const fileName = `${Date.now()}-${file.name}`;

  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error(error.cause, error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  console.log(publicUrl);

  return publicUrl;
};
