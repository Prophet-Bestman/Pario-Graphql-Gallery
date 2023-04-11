import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  register: Function;
  error: any;
  type?: string;
}

const Input = ({
  name,
  label,
  register,
  error,
  type,
  ...rest
}: InputProps & React.ComponentPropsWithoutRef<"input">) => {
  return (
    <div>
      <label
        className="block ml-2 mb-2 text-sm text-gray-500 font-bold"
        htmlFor={name}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          className="focus:outline-none px-4 py-2 sm:py-3 bg-[#efefef] rounded-full w-full border focus:border-gray-400 h-24"
          {...rest}
        ></textarea>
      ) : (
        <input
          {...register(name)}
          className="focus:outline-none px-4 py-2 sm:py-3 bg-[#efefef] rounded-full w-full border focus:border-gray-400"
          {...rest}
        />
      )}

      {!!error && (
        <p className="text-xs text-red-500 ml-3 mt-1">{`${error}`}</p>
      )}
    </div>
  );
};

export default Input;
