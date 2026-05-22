"use client";

import { Suspense, useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Search } from "lucide-react";

const Header = () => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // control on search results modal
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header
      className={`fixed z-100 top-0 left-0 w-full transition-all duration-300 
        ${isHeaderScrolled ? "bg-[#182026] py-3 shadow-sm shadow-surface" : "bg-transparent py-5"}`}
    >
      <div className="container flex items-center justify-between">
        <Logo />

        <div className="hidden sm:block lg:hidden">
          <SearchBar open={open} setOpen={setOpen} />
        </div>

        <div className="flex items-center gap-4 sm:hidden">
          <button
            className="cursor-pointer p-2 text-foreground glass rounded-full ring-2 ring-muted shadow-lg shadow-surface"
            onClick={() => setOpen(true)}
          >
            <Search size={22} />
          </button>

          <Suspense>
            <Navbar />
          </Suspense>
        </div>

        <div className="hidden sm:block">
          <Suspense>
            <Navbar />
          </Suspense>
        </div>

        <div className="hidden lg:block">
          <SearchBar open={open} setOpen={setOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
