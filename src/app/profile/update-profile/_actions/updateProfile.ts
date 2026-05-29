"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getCurrentUser } from "@/server/db/getCurrentUser";
import { getUserProfile } from "@/server/db/getUserProfile";
import { uploadImage } from "@/server/db/uploadImage";
import { UserProfile } from "@/types/userProfile";
import { updateProfileSchema } from "@/validations/updateProfile";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  const result = updateProfileSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return {
      errors: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const userProfile: UserProfile = await getUserProfile();

  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size > 0)
    ? await uploadImage(imageFile)
    : undefined;

  try {
    const supabase = await createSupabaseServerClient();

    await supabase.from("profiles").upsert({
      id,
      user_name: data.userName,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      bio: data.bio,
      image_url: imageUrl ?? userProfile.image_url,
    });

    revalidatePath("/profile");

    return {
      status: 200,
      message: "Profile Updated Successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
