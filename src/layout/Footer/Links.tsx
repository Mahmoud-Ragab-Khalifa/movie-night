import { NavigationLinkItem } from "@/types/navigationLinkItem";

const Links = ({
  title,
  links,
}: {
  title: string;
  links: NavigationLinkItem[];
}) => {
  return (
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-4">{title}</h3>

      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="block py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default Links;
