import Loader from "@/components/Loader";

const MainLoader = () => {
  return (
    <div className="fixed inset-0 min-h-dvh flex items-center justify-center glass-strong z-3000">
      <Loader />
    </div>
  );
};

export default MainLoader;
