import Link from "next/link";
import SignOutButton from "./SignOutButton";

const settingsList = [
  { href: "/profile", label: "Profile" },
  { href: "/watch-list", label: "Watch List" },
  { href: "/favourites", label: "Favourites" },
  { href: "/update-profile", label: "Update Profile" },
];

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
