import Settings from "./_components/Settings";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-dvh pt-19.5 md:pt-20 lg:pt-21.5">
      <div className="container flex flex-col md:flex-row gap-10 section-gap items-start">
        <Settings />
        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
