import { getUserProfile } from "@/server/db/getUserProfile";
import Form from "./_components/Form";

const UpdateProfilePage = async () => {
  const userProfile = await getUserProfile();

  return (
    <section className="flex-1 w-full pb-8 md:pb-0">
      <Form userProfile={userProfile} />
    </section>
  );
};

export default UpdateProfilePage;
