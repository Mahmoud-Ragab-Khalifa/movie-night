"use client";

import { Button } from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import { GoogleIcon } from "@/layout/Footer/SocialMediaIcons";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { SignIn } from "../../_actions/auth";
import { ActionState } from "@/types/actionState";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();

  const initialState: ActionState = {
    errors: {},
    message: "",
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(SignIn, initialState);

  useEffect(() => {
    if (state && state.status && state.message && !pending) {
      if (state.status === 201) {
        toast.success(state.message);

        router.replace("/profile");
      } else {
        toast.error(state.message);
      }
    }
  }, [pending, router, state]);

  return (
    <form action={action}>
      <h1 className="font-bold text-2xl text-center text-muted-foreground">
        Sign In
      </h1>

      <p className="text-sm mt-5 mb-8 text-neutral-400 text-center">
        Welcome Back
      </p>

      <div className="grid gap-5">
        <CustomInput
          id="email"
          name="email"
          type="email"
          label="Email"
          defaultValue={state.formData?.get("email") as string}
          error={state.errors?.email}
        />

        <CustomInput
          id="password"
          name="password"
          type="password"
          label="Password"
          defaultValue={state.formData?.get("password") as string}
          error={state.errors?.password}
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-10"
        size="default"
        disabled={pending}
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>

      <div className="flex items-center justify-center gap-2 mt-5">
        <span className="text-sm text-muted-foreground">
          Don&apos;t Have An Account?
        </span>{" "}
        <Link href={"/auth/sign-up"} className="text-primary font-bold">
          Register
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
        <span>Sign In With Google</span>
      </Button>
    </form>
  );
};

export default Form;
