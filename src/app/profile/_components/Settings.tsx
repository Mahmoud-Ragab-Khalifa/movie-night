import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { settingsList } from "@/constants/profileSettings";

const Settings = () => {
  return (
    <div className="w-full max-w-xs glass rounded-lg p-4 ring-2 ring-muted shadow-lg shadow-surface flex flex-col gap-5">
      {settingsList.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}

      <SignOutButton />
    </div>
  );
};

export default Settings;
