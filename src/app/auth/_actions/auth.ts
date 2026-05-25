"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { signUpSchema } from "@/validations/auth";

export const signUp = async (prevState: unknown, formData: FormData) => {
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return {
      errors: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        data: {
          userName: result.data.name,
        },
        emailRedirectTo: `${window.location.origin}/profile`,
      },
    });

    if (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }

    return {
      status: 201,
      message: "Welcome, Your Account Created Sucessfully",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
