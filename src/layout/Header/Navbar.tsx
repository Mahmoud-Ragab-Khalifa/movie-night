"use client";

import { useEffect, useRef, useState } from "react";
import { navigationLinks } from "@/constants/navigationLinks";
import { Menu, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle Navigation Links Active State

  const searchParams = useSearchParams();
  const activeLink =
    searchParams.get("section") === "browse-by-genre"
      ? "home"
      : (searchParams.get("section") ?? "home");

  // Handle Clicking on Home Navigation Link To Work As scroll to top

  const pathname = usePathname();

  const handleClickToHomeLink = (href: string) => {
    if (href === "#home" && pathname === "/") {
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav>
      {/* Desktop Navigation Links */}

      <div className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1 ring-2 ring-muted shadow-lg shadow-surface">
        {navigationLinks.map((item) => (
          <Link
            key={item.href}
            href={`/?section=${item.href.slice(1)}${item.href}`}
            className={`${activeLink === item.href.slice(1) && pathname === "/" ? "text-foreground" : "text-muted-foreground"} px-4 py-2 text-sm transition-all duration-300 hover:text-foreground hover:bg-surface rounded-full relative`}
            onClick={() => {
              handleClickToHomeLink(item.href);
            }}
          >
            {item.label}

            {activeLink === item.href.slice(1) && pathname === "/" && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3/5 h-1 bg-linear-to-r from-primary via-primary/60 to-transparent rounded-full shadow-2xl shadow-primary transition-all duration-500" />
            )}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Links */}

      <button
        className="lg:hidden cursor-pointer p-2 text-foreground glass rounded-full ring-2 ring-muted shadow-lg shadow-surface"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 w-full glass-strong py-6 animate-fade-in-lg"
          ref={mobileMenuRef}
        >
          <div className="container grid gap-4">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={`/?section=${item.href.slice(1)}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleClickToHomeLink(item.href);
                }}
                className={`${activeLink === item.href.slice(1) && pathname === "/" ? "text-foreground" : "text-muted-foreground"} text-lg active:text-foreground hover:text-foreground transition-colors duration-300 py-2 nth-[1]:pt-0 relative`}
              >
                {item.label}

                {activeLink === item.href.slice(1) && pathname === "/" && (
                  <div className="absolute left-0 bottom-0 w-15 h-1 bg-linear-to-r from-primary via-primary/60 to-transparent rounded-full shadow-2xl shadow-primary transition-all duration-500" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
