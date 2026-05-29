import { addUserProfile } from "@/server/db/addUserProfile";
import { getCurrentUser } from "@/server/db/getCurrentUser";
import { getUserProfile } from "@/server/db/getUserProfile";
import { UserProfile } from "@/types/userProfile";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  await addUserProfile(user);

  const userProfile: UserProfile = await getUserProfile();

  return (
    <section className="flex flex-col gap-5">
      <div className="grid gap-0.5">
        <span className="text-sm text-muted-foreground">Email:</span>
        <span className="text-lg text-foreground">{userProfile.email}</span>
      </div>

      {userProfile.user_name && (
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">User Name:</span>
          <span className="text-lg text-foreground">
            {userProfile.user_name}
          </span>
        </div>
      )}

      {userProfile.full_name && (
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">Full Name:</span>
          <span className="text-lg text-foreground">
            {userProfile.full_name}
          </span>
        </div>
      )}

      {userProfile.bio && (
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">Bio:</span>
          <span className="text-lg text-foreground">{userProfile.bio}</span>
        </div>
      )}

      {userProfile.phone && (
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">Phone:</span>
          <span className="text-lg text-foreground">{userProfile.phone}</span>
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
