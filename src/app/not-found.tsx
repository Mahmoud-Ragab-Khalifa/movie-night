import { baseClasses } from "@/components/Button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="fixed inset-0 min-h-dvh flex flex-col gap-4 items-center justify-center glass-strong z-3000">
      <p className="animate-pulse">This Page Is Not Found</p>

      <Link href={"/"} className={`${baseClasses} px-4 py-1 text-sm`}>
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
