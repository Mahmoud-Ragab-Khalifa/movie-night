import { ButtonHTMLAttributes } from "react";

export const baseClasses =
  "relative overflow-hidden rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 cursor-pointer ring ring-primary flex items-center justify-center gap-2";

export const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type ButtonProps = {
  className?: string;
  size?: "sm" | "default" | "lg";
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className = "",
  size = "default",
  children,
  ...probs
}: ButtonProps) => {
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...probs}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
