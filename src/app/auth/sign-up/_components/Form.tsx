"use client";

import { Button } from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import { GoogleIcon } from "@/layout/Footer/SocialMediaIcons";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signUp } from "../../_actions/auth";
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

  const [state, action, pending] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state && state.message && state.status && !pending) {
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
        Sign Up
      </h1>

      <p className="text-sm mt-5 mb-8 text-neutral-400 text-center">{`Let's Get Started With Free Plan`}</p>

      <div className="grid gap-5">
        <CustomInput
          id="name"
          name="name"
          type="text"
          label="Name"
          error={state.errors?.name}
          defaultValue={state.formData?.get("name") as string}
        />

        <CustomInput
          id="email"
          name="email"
          type="email"
          label="Email"
          error={state.errors?.email}
          defaultValue={state.formData?.get("email") as string}
        />

        <CustomInput
          id="password"
          name="password"
          type="password"
          label="Password"
          error={state.errors?.password}
          defaultValue={state.formData?.get("password") as string}
        />

        <CustomInput
          id="confirm-password"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          error={state.errors?.confirmPassword}
          defaultValue={state.formData?.get("confirmPassword") as string}
        />
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
