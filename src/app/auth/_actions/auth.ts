"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { signInSchema, signUpSchema } from "@/validations/auth";

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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_Environment_BASE_URL}/profile`,
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

export const SignIn = async (prevState: unknown, formData: FormData) => {
  const result = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return {
      errors: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }

    return {
      status: 201,
      message: "Welcome Back To Your Account",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Unexpected Error Check Your Connection",
    };
  }
};
