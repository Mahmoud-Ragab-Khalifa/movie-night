import { quickLinks, resourcesLinks } from "@/constants/footerLinks";
import Logo from "../Header/Logo";
import Links from "./Links";
import { FacebookIcon, InstagramIcon, XIcon } from "./SocialMediaIcons";
import { Button } from "@/components/Button";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="relative py-8 md:py-16 bg-linear-to-b from-black/80 via-black/90 to-black">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10">
        {/* Description */}
        <div>
          <Logo />

          <p className="text-sm text-muted-foreground my-4">
            Discover trending movies, top-rated classics, and must-watch TV
            shows in one cinematic experience. Movie Night helps you explore
            entertainment with smooth browsing, dynamic sliders, detailed movie
            info, and a modern responsive design built for every screen.
          </p>

          <div className="flex items-center gap-2 cursor-pointer">
            <XIcon />
            <InstagramIcon />
            <FacebookIcon />
          </div>
        </div>

        {/* Quick Links */}
        <Links title="Quick Links" links={quickLinks} />

        {/* Resources */}
        <Links title="Resources" links={resourcesLinks} />

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-4">Newsletter</h3>

          <p className="text-sm text-muted-foreground mb-4">
            Stay Up To Date With The Latest Movies And News
          </p>

          <input
            type="email"
            name="email"
            placeholder="Your Email Address..."
            className="rounded-md block w-full p-2 ring-2 ring-neutral-900 transition-all focus:ring-neutral-950 text-white text-sm caret-primary bg-black/50 placeholder-muted focus:outline-none"
          />

          <Button size="sm" className="w-full mt-4 text-xs!">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Copy Rights */}
      <div className="container">
        <div className="flex flex-col md:flex-row gap-2.5 items-start md:items-center md:justify-between pt-4 mt-6 md:mt-10 border-t border-t-muted text-muted-foreground text-xs">
          <div>
            @{date.getFullYear()}{" "}
            <span className="italic font-semibold text-primary">
              Movie Night
            </span>
            . All Rights Reserved. Powerd By TMDB API
          </div>

          <div className="flex items-center gap-2">
            <span>Privacy Policy</span>
            <span>Terms Of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
