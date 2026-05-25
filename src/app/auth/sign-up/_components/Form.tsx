"use client";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { GoogleIcon } from "@/layout/Footer/SocialMediaIcons";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signUp } from "../../_actions/auth";
import { ActionState } from "@/types/actionState";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

const Form = () => {
  const initialState: ActionState = {
    errors: {},
    message: "",
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state && state.message && state.status && !pending) {
      if (state.status === 201) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [pending, state]);

  return (
    <form action={action}>
      <h1 className="font-bold text-2xl text-center text-muted-foreground">
        Sign Up
      </h1>

      <p className="text-sm mt-5 mb-8 text-neutral-400 text-center">{`Let's Get Started With Free Plan`}</p>

      <div className="grid gap-5">
        <div className="grid gap-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Name"
            defaultValue={state.formData?.get("name") as string}
          />

          {state.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors?.name}</p>
          )}
        </div>

        <div className="grid gap-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            defaultValue={state.formData?.get("email") as string}
          />

          {state.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors?.email}</p>
          )}
        </div>

        <div className="grid gap-4">
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            defaultValue={state.formData?.get("password") as string}
          />

          {state.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors?.password}</p>
          )}
        </div>

        <div className="grid gap-4">
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            defaultValue={state.formData?.get("confirmPassword") as string}
          />

          {state.errors?.confirmPassword && (
            <p className="text-red-500 text-sm">
              {state.errors?.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-10"
        size="default"
        disabled={pending}
      >
        {pending ? "Signing Up..." : "Sign Up"}
      </Button>

      <div className="flex items-center justify-center gap-2 mt-5">
        <span className="text-sm text-muted-foreground">
          Already Have An Account?
        </span>{" "}
        <Link href={"/auth/sign-in"} className="text-primary font-bold">
          Log In
        </Link>
      </div>

      <div className="relative h-0.5 w-full bg-muted mt-5 mb-8">
        <span className="absolute top-1/2 left-1/2 -translate-1/2 px-3 py-0.5 bg-[#182026] text-muted-foreground">
          or
        </span>
      </div>

      <Button
        type="button"
        className="w-full bg-transparent ring-muted! shadow-muted! hover:bg-surface"
        size="default"
      >
        <GoogleIcon />
        <span>Sign Up With Google</span>
      </Button>
    </form>
  );
};

export default Form;
