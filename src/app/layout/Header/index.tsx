"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

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

  return (
    <header
      className={`sticky z-50 top-0 left-0 w-full transition-all duration-300 
        ${isHeaderScrolled ? "bg-[#182026] py-3 shadow-sm shadow-surface" : "bg-transparent py-5"}`}
    >
      <div className="container flex items-center justify-between">
        <Logo />

        <Navbar />

        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
