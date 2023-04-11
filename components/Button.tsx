import React, { ClassAttributes } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "outline" | "link" | "solid";
  className?: string;
}

const Button = ({
  children,
  variant,
  className,
  ...rest
}: ButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      //   {...rest}
      className={`py-3 px-5  rounded-full ${
        variant === "outline"
          ? "border border-black text-black"
          : variant === "link"
          ? "text-black underline"
          : "bg-black text-[#efefef] font-semibold"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
