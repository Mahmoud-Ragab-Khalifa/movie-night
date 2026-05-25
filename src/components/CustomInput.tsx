"use client";

import { InputHTMLAttributes } from "react";

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const CustomInput = ({
  label,
  id,
  className = "",
  ...props
}: FloatingInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder=" "
        className={`peer w-full rounded-lg border-none ring ring-muted-foreground bg-[#182026] px-4 pt-6 pb-2 text-neutral-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />

      <label
        htmlFor={id}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#182026] px-2 text-muted-foreground transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-0.5 peer-not-placeholder-shown:text-xs"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
