import { Denk_One } from "next/font/google";
import Link from "next/link";

const denkFont = Denk_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Logo = () => {
  return (
    <Link href={"/"} className={`${denkFont.className} text-3xl md:text-4xl`}>
      <span className="text-primary">Movie</span>
      <span className="text-white ps-0.75">Night</span>
      <span className="text-primary ps-0.75 text-xs animate-pulse">.HD</span>
    </Link>
  );
};

export default Logo;
