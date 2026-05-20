"use client";

import { NavigationLinkItem } from "@/types/navigationLinkItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = ({
  title,
  links,
}: {
  title: string;
  links: NavigationLinkItem[];
}) => {
  const pathname = usePathname();

  return (
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-4">{title}</h3>

      {links.map((link, idx) => (
        <Link
          key={idx}
          href={`/?section=${link.href.slice(1)}${link.href}`}
          className="block py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Links;
