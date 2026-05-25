import SignOutButton from "./_components/SignOutButton";

const ProfilePage = async () => {
  return (
    <main className="min-h-dvh pt-19.5 md:pt-20 lg:pt-21.5">
      <section className="section-gap">
        <div className="container">
          Profile Page
          <SignOutButton />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
