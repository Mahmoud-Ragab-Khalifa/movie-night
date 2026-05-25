"use client";

import { Button } from "@/components/Button";
import { GoogleIcon } from "@/layout/Footer/SocialMediaIcons";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignWithGoogleButton = ({ text }: { text: string }) => {
  const supabase = getSupabaseBrowserClient();

  const [state, setState] = useState<{
    status: number | null;
    message: string | null;
    pending: boolean;
  }>({
    status: null,
    message: null,
    pending: false,
  });

  const handleSignWithGoogle = async () => {
    setState((prev) => ({ ...prev, pending: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/profile`,
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        setState((prev) => ({
          ...prev,
          status: error.status as number,
          message: error.message,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        status: 200,
        message: "Welcome Signing In Is Created Successfully",
      }));
    } catch (error) {
      console.error(error);

      setState((prev) => ({
        ...prev,
        status: 500,
        message: "Unexpected Error Check Your Connection",
      }));
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  // Show Toast Messages
  useEffect(() => {
    if (state && state.status && state.message && !state.pending) {
      if (state.status === 200) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Button
      type="button"
      className="w-full bg-transparent ring-muted! shadow-muted! hover:bg-surface"
      size="default"
      onClick={handleSignWithGoogle}
      disabled={state.pending}
    >
      <GoogleIcon />
      <span>{state.pending ? "Signing..." : `${text}`}</span>
    </Button>
  );
};

export default SignWithGoogleButton;
