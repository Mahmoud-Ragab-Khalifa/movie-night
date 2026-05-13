"use client";

import { useEffect, useRef, useState } from "react";
import { navigationLinks } from "@/constants/navigationLinks";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

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

  return (
    <nav>
      {/* Desktop Navigation Links */}

      <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1">
        {navigationLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-surface rounded-full"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Navigation Links */}

      <button
        className="md:hidden cursor-pointer p-2 text-foreground bg-surface rounded-full"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full glass-strong py-6 animate-fade-in-lg"
          ref={mobileMenuRef}
        >
          <div className="container grid gap-4">
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground active:text-foreground hover:text-foreground transition-colors duration-300 py-2 nth-[1]:pt-0"
              >
                {item.label}
              </a>
            ))}

            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
