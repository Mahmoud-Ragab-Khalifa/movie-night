import Settings from "./_components/Settings";

const ProfilePage = async () => {
  return (
    <main className="min-h-dvh pt-19.5 md:pt-20 lg:pt-21.5">
      <section className="section-gap">
        <div className="container flex flex-col md:flex-row gap-10">
          <Settings />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
