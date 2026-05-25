"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const router = useRouter();

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

  const handleSignOut = async () => {
    setState((prev) => ({ ...prev, pending: true }));
    try {
      const { error } = await supabase.auth.signOut();

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
        message: "Logged Out Sucessfully",
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

  // Detect Any Changes In User Session If Not Found Redirect To Auth Route
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session || !session.user) {
        router.replace("/auth/sign-in");
      }
    });

    // Listener If Found Set Unsubscripe To Avoid Memory Leaks
    return () => listener?.subscription.unsubscribe();
  }, [router, supabase.auth]);

  return (
    <button
      className="py-2 px-4 bg-red-500 ring-2 ring-red-600 hover:ring-4 hover:bg-red-600 active:scale-110 transition-all duration-300 text-neutral-200 cursor-pointer rounded-lg"
      disabled={state.pending}
      onClick={handleSignOut}
    >
      {state.pending ? "Logging Out..." : "Log Out"}
    </button>
  );
};

export default SignOutButton;
