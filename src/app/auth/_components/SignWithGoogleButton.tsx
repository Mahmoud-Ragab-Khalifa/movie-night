"use client";

import { Button } from "@/components/Button";
import { GoogleIcon } from "@/layout/Footer/SocialMediaIcons";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignWithGoogleButton = ({ text }: { text: string }) => {
  const router = useRouter();

  const supabase = getSupabaseBrowserClient();

  const [loading, setLoading] = useState(false);

  const handleSignWithGoogle = async () => {
    if (loading) return;

    setLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/sign-in`,
      },
    });
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session && session.user) {
          router.replace("/profile");
        }
      },
    );

    // Listener If Found Set Unsubscripe To Avoid Memory Leaks
    return () => listener?.subscription.unsubscribe();
  }, [router, supabase.auth]);

  return (
    <Button
      type="button"
      className="w-full bg-transparent ring-muted! shadow-muted! hover:bg-surface"
      size="default"
      onClick={handleSignWithGoogle}
      disabled={loading}
    >
      <GoogleIcon />
      <span>{loading ? "Signing..." : `${text}`}</span>
    </Button>
  );
};

export default SignWithGoogleButton;
