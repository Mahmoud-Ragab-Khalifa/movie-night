"use client";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { GoogleIcon } from "@/layout/Footer/SocialMediaIcons";
import Link from "next/link";

const Form = () => {
  return (
    <form action="">
      <h1 className="font-bold text-2xl text-center text-muted-foreground">
        Sign In
      </h1>

      <p className="text-sm mt-5 mb-8 text-neutral-400 text-center">
        Welcome Back
      </p>

      <div className="grid gap-5">
        <Input id="email" name="email" type="email" label="Email" />
        <Input id="password" name="password" type="password" label="Password" />
      </div>

      <Button type="submit" className="w-full mt-10" size="default">
        Sign In
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
