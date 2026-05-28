"use client";

import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { settingsList } from "@/constants/profileSettings";
import { usePathname } from "next/navigation";

const Settings = () => {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-xs glass rounded-lg p-4 ring-2 ring-muted shadow-lg shadow-surface flex flex-col gap-5">
      {settingsList.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${pathname === link.href ? "text-foreground" : "text-muted-foreground"} transition-all duration-300 hover:text-foreground relative pb-1 group`}
        >
          {link.label}

          {pathname === link.href && (
            <div className="absolute bottom-0 left-0 w-1/4 bg-linear-to-r from-primary via-primary/70 to-transparent rounded-full h-1 transition-all duration-300 group-hover:w-1/3" />
          )}
        </Link>
      ))}

      <SignOutButton />
    </div>
  );
};

export default Settings;
