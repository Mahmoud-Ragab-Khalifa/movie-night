"use client";

import { Denk_One } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const denkFont = Denk_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Logo = () => {
  const pathname = usePathname();
  return (
    <Link
      href={"/"}
      className={`${denkFont.className} text-3xl md:text-4xl`}
      onClick={() => {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <span className="text-primary">Movie</span>
      <span className="text-white ps-0.75">Night</span>
      <span className="text-primary ps-0.75 text-xs animate-pulse">.HD</span>
    </Link>
  );
};

export default Logo;
