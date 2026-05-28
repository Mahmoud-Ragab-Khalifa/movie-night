import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const ProfilePage = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex flex-col gap-5">
      <div className="grid gap-0.5">
        <span className="text-sm text-muted-foreground">Email:</span>
        <span className="text-lg text-foreground">{user?.email}</span>
      </div>

      {user?.user_metadata.userName && (
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">UserName:</span>
          <span className="text-lg text-foreground">
            {user?.user_metadata.userName}
          </span>
        </div>
      )}

      {user?.phone && (
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">Phone:</span>
          <span className="text-lg text-foreground">{user?.phone}</span>
        </div>
      )}

      <div className="grid gap-0.5">
        <span className="text-sm text-muted-foreground">Sign In With:</span>
        <span className="text-lg text-foreground capitalize">
          {user?.app_metadata.provider}
        </span>
      </div>
    </section>
  );
};

export default ProfilePage;
